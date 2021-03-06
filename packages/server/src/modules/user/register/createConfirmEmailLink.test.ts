import { Connection } from 'typeorm';
import * as Redis from 'ioredis';
import fetch from 'node-fetch';
import * as faker from 'faker';

import { createConfirmEmailLink } from './createConfirmEmailLink';
import { createTestConn } from '../../../testUtils/createTestConn';
import { User } from '../../../entity/User';

let userId: string;
const redis = new Redis();

let conn: Connection;

beforeAll(async () => {
  conn = await createTestConn();
  const user = await User.create({
    email: faker.internet.email(),
    password: faker.internet.password(),
  }).save();
  userId = user.id;
});

afterAll(async () => {
  conn.close();
});

test('make sure it confirms user and clears key in redis', async () => {
  const url = await createConfirmEmailLink(
    process.env.TEST_HOST as string,
    userId,
    redis
  );

  const response = await fetch(url);
  const text = await response.text();
  expect(text).toEqual('ok');
  const user = await User.findOne({ where: { id: userId } });
  expect((user as User).confirmed).toBeTruthy();
  const chunks = url.split('/');
  const key = chunks[chunks.length - 1];
  const value = await redis.get(key);
  expect(value).toBeNull();
});
