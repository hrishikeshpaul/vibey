/* eslint-disable no-undef */
'use strict';

const chai = require('chai');

const { createTokens } = require('../../lib/auth');

const expect = chai.expect;

describe('token functions', () => {
  const mockUser = {
    id: '123',
    email: 'test@testuser.test',
  };

  describe('create tokens', () => {
    it('should generate two unique tokens', async () => {
      const [accessToken, refreshToken] = await createTokens(mockUser);
      expect(refreshToken).to.be.a('string');
      expect(accessToken).to.be.a('string');
      expect(accessToken).not.to.equal(refreshToken);
    });
  });
});
