/* eslint-disable no-undef */
'use strict';

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');

const { createTokens, refreshTokens } = require('../../lib/auth');
const { getAsyncJwtClient } = require('../../lib/redis');

const expect = chai.expect;
const clock = sinon.useFakeTimers();
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

  // TODO add create tokens for AT as 'before do'
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

    it('deletes the old access token from the redis client', async function() {
      const [accessToken, refreshToken] = await createTokens(mockUser);
      await expect(getAsyncJwtClient(accessToken))
        .to.eventually.equal(refreshToken);

      // done to advance the clock 1s so that the jwt are different
      clock.tick(1500);
      await refreshTokens(accessToken, mockUser);
      await expect(getAsyncJwtClient(accessToken))
        .to.eventually.equal(null);
    });
  });
});
