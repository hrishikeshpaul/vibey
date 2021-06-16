/* eslint-disable no-undef */
'use strict';

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

const { createTokens } = require('../../lib/auth');
const { getAsyncJwtClient } = require('../../lib/redis');

const expect = chai.expect;
chai.use(chaiAsPromised);

describe('token functions', () => {
  const mockUser = {
    id: '123',
    email: 'test@testuser.test',
  };

  describe('create tokens', () => {
    it('should generate two unique tokens', async() => {
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
});
