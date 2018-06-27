import { Connection } from 'typeorm';
import * as faker from 'faker';

import { TestClient } from '../../../utils/testClient';
import { User } from '../../../entity/User';
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

describe('logout', async () => {
  it('should test user logout with multiple sessions', async () => {
    const sess1 = new TestClient(process.env.TEST_HOST as string);
    const sess2 = new TestClient(process.env.TEST_HOST as string);

    await sess1.login(email, password);
    await sess2.login(email, password);
    expect(await sess1.me()).toEqual(await sess2.me());

    await sess1.logout();
    expect(await sess1.me()).toEqual(await sess2.me());
  });

  it('should test user logout with a single session', async () => {
    const client = new TestClient(process.env.TEST_HOST as string);

    await client.login(email, password);

    const response = await client.me();

    expect(response.data).toEqual({
      me: {
        id: userId,
        email: email,
      },
    });

    await client.logout();

    const response2 = await client.me();

    expect(response2.data.me).toBeNull();
  });
});
