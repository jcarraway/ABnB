"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
require('dotenv-safe').config();
const graphql_yoga_1 = require("graphql-yoga");
const session = require("express-session");
const connectRedis = require("connect-redis");
const RateLimit = require("express-rate-limit");
const RateLimitRedisStore = require("rate-limit-redis");
const redis_1 = require("./redis");
const constants_1 = require("./constants");
const generateSchema_1 = require("./utils/generateSchema");
const confirmEmail_1 = require("./routes/confirmEmail");
const createTypeormConn_1 = require("./utils/createTypeormConn");
const createTestConn_1 = require("./testUtils/createTestConn");
const SESSION_SECRET = 'alkdjfalkdjaflkdjag';
const RedisStore = connectRedis(session);
exports.startServer = () => __awaiter(this, void 0, void 0, function* () {
    if (process.env.NODE_ENV === 'test') {
        yield redis_1.redis.flushall();
    }
    const server = new graphql_yoga_1.GraphQLServer({
        schema: generateSchema_1.genSchema(),
        context: ({ request }) => ({
            redis: redis_1.redis,
            url: request.protocol + '://' + request.get('host'),
            session: request.session,
            req: request,
        }),
    });
    server.express.use(new RateLimit({
        store: new RateLimitRedisStore({
            client: redis_1.redis,
        }),
        windowMs: 15 * 60 * 1000,
        max: 500,
        delayMs: 0,
    }));
    server.express.use(session({
        name: 'xid',
        store: new RedisStore({
            client: redis_1.redis,
            prefix: constants_1.redisSessionPrefix,
        }),
        secret: SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 1000 * 60 * 60 * 24 * 7,
        },
    }));
    const cors = {
        credentials: true,
        origin: process.env.NODE_ENV === 'test'
            ? '*'
            : process.env.FRONTEND_HOST,
    };
    server.express.get('/confirm/:id', confirmEmail_1.confirmEmail);
    if (process.env.NODE_ENV === 'test') {
        yield createTestConn_1.createTestConn(true);
    }
    else {
        yield createTypeormConn_1.createTypeormConn();
    }
    const app = yield server.start({
        cors,
        port: process.env.NODE_ENV === 'test' ? 0 : 4000,
    });
    const { port } = app.address();
    console.log(`Server is running on localhost:${port}`);
    return app;
});
//# sourceMappingURL=startServer.js.map