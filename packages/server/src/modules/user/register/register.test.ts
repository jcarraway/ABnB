import { Connection } from 'typeorm';
import * as faker from 'faker';
import { invalidEmail, emailTooShort, passwordTooShort } from '@abb/common';

import { duplicateEmail } from './errorMessages';
import { createTestConn } from '../../../testUtils/createTestConn';
import { TestClient } from '../../../utils/testClient';
import { User } from '../../../entity/User';

faker.seed(Date.now() + 5);
const email = faker.internet.email();
const password = faker.internet.password();

const client = new TestClient(process.env.TEST_HOST as string);

let conn: Connection;
beforeAll(async () => {
  conn = await createTestConn();
});
afterAll(async () => {
  conn.close();
});

describe('Register user', async () => {
  it('check for duplicate emails', async () => {
    // test for successful user registration
    const response = await client.register(email, password);
    expect(response.data).toEqual({ register: null });
    const users = await User.find({ where: { email } });
    expect(users).toHaveLength(1);
    const user = users[0];
    expect(user.email).toEqual(email);
    expect(user.password).not.toEqual(password);

    const response2: any = await client.register(email, password);
    expect(response2.data.register).toHaveLength(1);
    expect(response2.data.register[0]).toEqual({
      path: 'email',
      message: duplicateEmail,
    });
  });

  it('check bad email', async () => {
    const response3: any = await client.register('b', password);
    expect(response3.data).toEqual({
      register: [
        {
          path: 'email',
          message: emailTooShort,
        },
        {
          path: 'email',
          message: invalidEmail,
        },
      ],
    });
  });

  it('catch bad password', async () => {
    const response4: any = await client.register(email, 'a');
    expect(response4.data).toEqual({
      register: [
        {
          path: 'password',
          message: passwordTooShort,
        },
      ],
    });
  });

  it('catch bad email and bad password', async () => {
    const response5: any = await client.register('b', 'a');
    expect(response5.data).toEqual({
      register: [
        {
          path: 'email',
          message: emailTooShort,
        },
        {
          path: 'email',
          message: invalidEmail,
        },
        {
          path: 'password',
          message: passwordTooShort,
        },
      ],
    });
  });
});
