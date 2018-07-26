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
const faker = require("faker");
const common_1 = require("@abb/common");
const errorMessages_1 = require("./errorMessages");
const createTestConn_1 = require("../../../testUtils/createTestConn");
const testClient_1 = require("../../../utils/testClient");
const User_1 = require("../../../entity/User");
const email = faker.internet.email();
const password = faker.internet.password();
let conn;
beforeAll(() => __awaiter(this, void 0, void 0, function* () {
    conn = yield createTestConn_1.createTestConn();
}));
afterAll(() => __awaiter(this, void 0, void 0, function* () {
    conn.close();
}));
describe('Register user', () => __awaiter(this, void 0, void 0, function* () {
    it('check for duplicate emails', () => __awaiter(this, void 0, void 0, function* () {
        const client = new testClient_1.TestClient(process.env.TEST_HOST);
        const response = yield client.register(email, password);
        expect(response.data).toEqual({ register: null });
        const users = yield User_1.User.find({ where: { email } });
        expect(users).toHaveLength(1);
        const user = users[0];
        expect(user.email).toEqual(email);
        expect(user.password).not.toEqual(password);
        const response2 = yield client.register(email, password);
        expect(response2.data.register).toHaveLength(1);
        expect(response2.data.register[0]).toEqual({
            path: 'email',
            message: errorMessages_1.duplicateEmail,
        });
    }));
    it('check bad email', () => __awaiter(this, void 0, void 0, function* () {
        const client = new testClient_1.TestClient(process.env.TEST_HOST);
        const response3 = yield client.register('b', password);
        expect(response3.data).toEqual({
            register: [
                {
                    path: 'email',
                    message: common_1.emailTooShort,
                },
                {
                    path: 'email',
                    message: common_1.invalidEmail,
                },
            ],
        });
    }));
    it('catch bad password', () => __awaiter(this, void 0, void 0, function* () {
        const client = new testClient_1.TestClient(process.env.TEST_HOST);
        const response4 = yield client.register(email, 'a');
        expect(response4.data).toEqual({
            register: [
                {
                    path: 'password',
                    message: common_1.passwordTooShort,
                },
            ],
        });
    }));
    it('catch bad email and bad password', () => __awaiter(this, void 0, void 0, function* () {
        const client = new testClient_1.TestClient(process.env.TEST_HOST);
        const response5 = yield client.register('b', 'a');
        expect(response5.data).toEqual({
            register: [
                {
                    path: 'email',
                    message: common_1.emailTooShort,
                },
                {
                    path: 'email',
                    message: common_1.invalidEmail,
                },
                {
                    path: 'password',
                    message: common_1.passwordTooShort,
                },
            ],
        });
    }));
}));
//# sourceMappingURL=register.test.js.map