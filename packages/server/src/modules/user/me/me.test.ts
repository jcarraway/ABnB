import { Connection } from 'typeorm';
import * as faker from 'faker';

import { User } from '../../../entity/User';
import { TestClient } from '../../../utils/testClient';
import { createTestConn } from '../../../testUtils/createTestConn';

let conn: Connection;
let userId: string;
const email = faker.internet.email();
const password = faker.internet.password();

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

describe('me', async () => {
  it('should return null if no cookie', async () => {
    const client = new TestClient(process.env.TEST_HOST as string);

    const response = await client.me();

    expect(response.data.me).toBeNull();
  });

  it('should get current user', async () => {
    const client = new TestClient(process.env.TEST_HOST as string);

    await client.login(email, password);

    const response = await client.me();

    expect(response.data).toEqual({
      me: {
        id: userId,
        email: email,
      },
    });
  });
});
