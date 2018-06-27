import { Connection } from 'typeorm';
import * as faker from 'faker';

import { User } from '../../../entity/User';
import { confirmEmailError, invalidLogin } from './errorMessages';
import { TestClient } from '../../../utils/testClient';
import { createTestConn } from '../../../testUtils/createTestConn';

const email = faker.internet.email();
const password = faker.internet.password();

const loginExpectError = async (
  client: TestClient,
  e: string,
  p: string,
  errMsg: string
) => {
  const response = await client.login(e, p);

  expect(response.data).toEqual({
    login: [
      {
        path: 'email',
        message: errMsg,
      },
    ],
  });
};

let conn: Connection;
beforeAll(async () => {
  conn = await createTestConn();
});
afterAll(async () => {
  conn.close();
});

describe('login', () => {
  it('sends an error back when email is not found', async () => {
    const client = new TestClient(process.env.TEST_HOST as string);
    await loginExpectError(client, faker.internet.email(), faker.internet.password(), invalidLogin);
  });

  it('sends an error back when email not confirmed', async () => {
    const client = new TestClient(process.env.TEST_HOST as string);
    await client.register(email, password);

    await loginExpectError(client, email, password, confirmEmailError);

    await User.update({ email: email }, { confirmed: true });

    await loginExpectError(client, email, faker.internet.password(), invalidLogin);
  });

  it('allows users to login with creds and confirmed', async () => {
    const client = new TestClient(process.env.TEST_HOST as string);
    const response = await client.login(email, password);

    expect(response.data).toEqual({ login: null });
  });
});
