import 'reflect-metadata';
// tslint:disable-next-line:no-var-requires
require('dotenv-safe').config();
import { GraphQLServer } from 'graphql-yoga';
import * as session from 'express-session';
import * as connectRedis from 'connect-redis';
import * as RateLimit from 'express-rate-limit';
import * as RateLimitRedisStore from 'rate-limit-redis';

import { redis } from './redis';
import { redisSessionPrefix } from './constants';
import { genSchema } from './utils/generateSchema';
import { confirmEmail } from './routes/confirmEmail';
import { createTypeormConn } from './utils/createTypeormConn';
import { createTestConn } from './testUtils/createTestConn';
import { AddressInfo } from 'net';

const SESSION_SECRET = 'alkdjfalkdjaflkdjag';

const RedisStore = connectRedis(session);

export const startServer = async () => {
  if (process.env.NODE_ENV === 'test') {
    await redis.flushall();
  }

  const server = new GraphQLServer({
    schema: genSchema() as any,
    context: ({ request }) => ({
      redis,
      url: request.protocol + '://' + request.get('host'),
      session: request.session,
      req: request,
    }),
  });

  server.express.use(
    new RateLimit({
      store: new RateLimitRedisStore({
        client: redis,
      }),
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 500, // limit each IP to 100 requests per windowMs
      delayMs: 0, // disable delaying - full speed until the max limit is reached
    })
  );

  server.express.use(
    session({
      name: 'xid',
      store: new RedisStore({
        client: redis as any,
        prefix: redisSessionPrefix,
      }),
      secret: SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
      },
    })
  );

  const cors = {
    credentials: true,
    origin:
      process.env.NODE_ENV === 'test'
        ? '*'
        : (process.env.FRONTEND_HOST as string),
  };

  server.express.get('/confirm/:id', confirmEmail);

  if (process.env.NODE_ENV === 'test') {
    await createTestConn(true);
  } else {
    await createTypeormConn();
  }
  const app = await server.start({
    cors,
    port: process.env.NODE_ENV === 'test' ? 0 : 4000,
  });
  const { port } = app.address() as AddressInfo;
  console.log(`Server is running on localhost:${port}`);

  return app;
};
