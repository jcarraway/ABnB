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
const Redis = require("ioredis");
const faker = require("faker");
const common_1 = require("@abb/common");
const testClient_1 = require("../../../utils/testClient");
const User_1 = require("../../../entity/User");
const createForgotPasswordLink_1 = require("../../../utils/createForgotPasswordLink");
const forgotPasswordLockAccount_1 = require("../../../utils/forgotPasswordLockAccount");
const errorMessages_1 = require("../login/errorMessages");
const errorMessages_2 = require("./errorMessages");
const createTestConn_1 = require("../../../testUtils/createTestConn");
let conn;
const redis = new Redis();
let userId;
const email = faker.internet.email();
const password = faker.internet.password();
const newPassword = faker.internet.password();
beforeAll(() => __awaiter(this, void 0, void 0, function* () {
    conn = yield createTestConn_1.createTestConn();
    const user = yield User_1.User.create({
        email,
        password,
        confirmed: true,
    }).save();
    userId = user.id;
}));
afterAll(() => __awaiter(this, void 0, void 0, function* () {
    conn.close();
}));
describe('forgot password', () => __awaiter(this, void 0, void 0, function* () {
    it('changes user password', () => __awaiter(this, void 0, void 0, function* () {
        const client = new testClient_1.TestClient(process.env.TEST_HOST);
        yield forgotPasswordLockAccount_1.forgotPasswordLockAccount(userId, redis);
        const url = yield createForgotPasswordLink_1.createForgotPasswordLink('', userId, redis);
        const parts = url.split('/');
        const key = parts[parts.length - 1];
        expect(yield client.login(email, password)).toEqual({
            data: {
                login: [
                    {
                        path: 'email',
                        message: errorMessages_1.accountLockedError,
                    },
                ],
            },
        });
        expect(yield client.forgotPasswordChange('a', key)).toEqual({
            data: {
                forgotPasswordChange: [
                    {
                        path: 'newPassword',
                        message: common_1.passwordTooShort,
                    },
                ],
            },
        });
        const response = yield client.forgotPasswordChange(newPassword, key);
        expect(response.data).toEqual({
            forgotPasswordChange: null,
        });
        expect(yield client.forgotPasswordChange(faker.internet.password(), key)).toEqual({
            data: {
                forgotPasswordChange: [
                    {
                        path: 'key',
                        message: errorMessages_2.expiredKeyError,
                    },
                ],
            },
        });
        expect(yield client.login(email, newPassword)).toEqual({
            data: {
                login: null,
            },
        });
    }));
}));
//# sourceMappingURL=forgotPassword.test.js.map