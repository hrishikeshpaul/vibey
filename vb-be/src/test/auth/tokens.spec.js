/* eslint-disable no-undef */
'use strict';

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');

const {
  createTokens,
  refreshTokens,
  checkWhitelist,
} = require('../../lib/auth');
const { getAsyncJwtClient, delAsyncJwtClient } = require('../../lib/redis');
const { isLoggedIn } = require('../../middlewares/auth');

const expect = chai.expect;
chai.use(chaiAsPromised);

describe('token functions', () => {
  const mockUser = {
    id: '123',
    email: 'test@testuser.test',
  };

  describe('createTokens', () => {
    it('returns two unique tokens', async() => {
      const [accessToken, refreshToken] = await createTokens(mockUser);
      expect(refreshToken).to.be.a('string');
      expect(accessToken).to.be.a('string');
      expect(accessToken).not.to.equal(refreshToken);
    });

    it('throws error if no user provided', async() => {
      await expect(createTokens())
        .to.eventually.be
        .rejectedWith('Cannot create tokens without user info');
    });

    it('adds the token pair to the jwt redis client', async() => {
      const [accessToken, refreshToken] = await createTokens(mockUser);
      await expect(getAsyncJwtClient(accessToken))
        .to.eventually
        .equal(refreshToken);
    });
  });

  describe('refreshTokens', () => {
    it('returns a pair of unique tokens', async() => {
      const [accessToken] = await createTokens(mockUser);
      const [
        refreshedAT,
        refreshedRT,
      ] = await refreshTokens(accessToken, mockUser);

      expect(refreshedAT).to.be.a('string');
      expect(refreshedRT).to.be.a('string');
      expect(refreshedAT).not.to.equal(refreshedRT);
    });

    it('throws an error if no arguments are provided', async() => {
      await expect(refreshTokens())
        .to.eventually.be
        .rejectedWith('Invalid argument for refresh token');
    });

    it('throws an error if invalid user object', async() => {
      const [accessToken] = await createTokens(mockUser);
      await expect(refreshTokens(accessToken, { name: 'Test' }))
        .to.eventually.be
        .rejectedWith('Invalid argument for refresh token');
    });

    it('deletes the old access token from the redis client', async() => {
      const [accessToken, refreshToken] = await createTokens(mockUser);
      const clock = sinon.useFakeTimers(new Date().getTime());

      await expect(getAsyncJwtClient(accessToken))
        .to.eventually.equal(refreshToken);

      // done to advance the clock 1s so that the jwt are different
      clock.tick(1500);
      await refreshTokens(accessToken, mockUser);
      await expect(getAsyncJwtClient(accessToken))
        .to.eventually.equal(null);
      clock.restore();
    });

    it('adds the new tokens to the redis client', async() => {
      const [accessToken] = await createTokens(mockUser);
      const [rAT, rRT] = await refreshTokens(accessToken, mockUser);

      expect(rRT).to.be.a('string');
      await expect(getAsyncJwtClient(rAT))
        .to.eventually.equal(rRT);
    });
  });

  describe('checkWhitelist', async() => {
    it('returns true if tokens are whitelisted', async() => {
      const [accessToken, refreshToken] = await createTokens(mockUser);

      await expect(checkWhitelist(accessToken, refreshToken))
        .to.eventually.equal(true);
    });

    it('returns false if mismatched token pair', async() => {
      const clock = sinon.useFakeTimers(new Date().getTime());
      const [accessToken, refreshToken] = await createTokens(mockUser);

      clock.tick(1500);
      const [accessToken2, refreshToken2] = await createTokens(mockUser);

      await expect(checkWhitelist(accessToken, refreshToken))
        .to.eventually.equal(true);
      await expect(checkWhitelist(accessToken2, refreshToken2))
        .to.eventually.equal(true);
      await expect(checkWhitelist(accessToken, refreshToken2))
        .to.eventually.equal(false);
    });
    clock.restore();
  });

  describe('isLoggedIn', async() => {
    it('calls next and updates headers if valid tokens', async() => {
      const nextSpy = sinon.spy();
      const [accessToken, refreshToken] = await createTokens(mockUser);
      const headers = {
        'v-at': accessToken,
        'v-rt': refreshToken,
      };

      await isLoggedIn({ headers }, {}, nextSpy);
      Promise.all(nextSpy.returnValues);
      sinon.assert.calledOnce(nextSpy);
    });

    it('throws error if missing tokens', async() => {
      const next = sinon.spy();
      const expectedError = sinon.match.instanceOf(Error)
        .and(sinon.match.has('message', 'Tokens required'));
      await isLoggedIn({ headers: {} }, {}, next);
      sinon.assert.calledWith(next, sinon.match(expectedError));
    });

    it('throws error if non-whitelisted token', async() => {
      const next = sinon.spy();
      const [accessToken, refreshToken] = await createTokens(mockUser);
      const headers = {
        'v-at': accessToken,
        'v-rt': refreshToken,
      };
      const expectedError = sinon.match.instanceOf(Error)
        .and(sinon.match.has('message', 'Non-whitelisted token'));

      await delAsyncJwtClient(accessToken);
      await isLoggedIn({ headers }, {}, next);
      sinon.assert.calledWith(next, sinon.match(expectedError));
    });

    it('throws error if tokens are whitelisted but expired', async() => {
      const next = sinon.spy();
      const clock = sinon.useFakeTimers(new Date().getTime());
      const [accessToken, refreshToken] = await createTokens(mockUser);
      const headers = {
        'v-at': accessToken,
        'v-rt': refreshToken,
      };
      const expectedError = sinon.match.instanceOf(Error)
        .and(sinon.match.has('message', 'Invalid tokens'));

      clock.tick(86400000 * 7); /* 7 days (RT expiration) */
      await isLoggedIn({ headers }, {}, next);
      sinon.assert.calledWith(next, sinon.match(expectedError));
      clock.restore();
    });

    it('throws an error if tokens are valid but mismatched', async() => {
      const next = sinon.spy();
      const clock = sinon.useFakeTimers(new Date().getTime());
      const [ accessToken ] = await createTokens(mockUser);

      clock.tick(900000); /* 15 minutes (AT expiration) */
      const [ , refreshToken2 ] = await createTokens(mockUser);
      const headers = {
        'v-at': accessToken,
        'v-rt': refreshToken2,
      };
      const expectedError = sinon.match.instanceOf(Error)
        .and(sinon.match.has('message', 'Mismatched/Non-whitelisted tokens'));

      await isLoggedIn({ headers }, {}, next);
      sinon.assert.calledWith(next, sinon.match(expectedError));
      clock.restore();
    });

    it('updates requet header tokens if valid token pair but AT expired',
      async() => {
        const clock = sinon.useFakeTimers(new Date().getTime());
        const [ accessToken, refreshToken ] = await createTokens(mockUser);
        const headers = {
          'v-at': accessToken,
          'v-rt': refreshToken,
        };

        clock.tick(900000); /* 15 minutes (AT expiration) */
        await isLoggedIn({ headers }, {}, () => null);
        expect(headers['v-at']).to.be.a('string');
        expect(headers['v-rt']).to.be.a('string');
        expect(headers['v-at']).not.to.equal(accessToken);
        expect(headers['v-rt']).not.to.equal(refreshToken);
      });
  });
});
