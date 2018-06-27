import { Connection } from 'typeorm';
import * as Redis from 'ioredis';
import * as faker from 'faker';

import { TestClient } from '../../../utils/testClient';
import { User } from '../../../entity/User';
import { createForgotPasswordLink } from '../../../utils/createForgotPasswordLink';
import { forgotPasswordLockAccount } from '../../../utils/forgotPasswordLockAccount';
import { accountLockedError } from '../login/errorMessages';
import { expiredKeyError } from './errorMessages';
import { createTestConn } from '../../../testUtils/createTestConn';
import { passwordTooShort } from '../register/errorMessages';

let conn: Connection;
const redis = new Redis();
let userId: string;
const email = faker.internet.email();
const password = faker.internet.password();
const newPassword = faker.internet.password();

beforeAll(async () => {
  conn = await createTestConn();
  const user = await User.create({
    email,
    password,
    confirmed: true,
  }).save();
  userId = user.id;
});

afterAll(async () => {
  conn.close();
});

describe('forgot password', async () => {
  it('changes user password', async () => {
    const client = new TestClient(process.env.TEST_HOST as string);

    await forgotPasswordLockAccount(userId, redis);
    const url = await createForgotPasswordLink('', userId, redis);
    const parts = url.split('/');
    const key = parts[parts.length - 1];

    // make sure you cannot login to locked account
    expect(await client.login(email, password)).toEqual({
      data: {
        login: [
          {
            path: 'email',
            message: accountLockedError,
          },
        ],
      },
    });

    // try changing to a password that is too short
    expect(await client.forgotPasswordChange('a', key)).toEqual({
      data: {
        forgotPasswordChange: [
          {
            path: 'newPassword',
            message: passwordTooShort,
          },
        ],
      },
    });
    const response = await client.forgotPasswordChange(newPassword, key);

    expect(response.data).toEqual({
      forgotPasswordChange: null,
    });

    // make sure redis key expires after password change
    expect(
      await client.forgotPasswordChange(faker.internet.password(), key)
    ).toEqual({
      data: {
        forgotPasswordChange: [
          {
            path: 'key',
            message: expiredKeyError,
          },
        ],
      },
    });

    expect(await client.login(email, newPassword)).toEqual({
      data: {
        login: null,
      },
    });
  });
});
