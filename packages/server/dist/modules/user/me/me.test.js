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
const User_1 = require("../../../entity/User");
const testClient_1 = require("../../../utils/testClient");
const createTestConn_1 = require("../../../testUtils/createTestConn");
let conn;
let userId;
const email = faker.internet.email();
const password = faker.internet.password();
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
describe('me', () => __awaiter(this, void 0, void 0, function* () {
    it('should return null if no cookie', () => __awaiter(this, void 0, void 0, function* () {
        const client = new testClient_1.TestClient(process.env.TEST_HOST);
        const response = yield client.me();
        expect(response.data.me).toBeNull();
    }));
    it('should get current user', () => __awaiter(this, void 0, void 0, function* () {
        const client = new testClient_1.TestClient(process.env.TEST_HOST);
        yield client.login(email, password);
        const response = yield client.me();
        expect(response.data).toEqual({
            me: {
                id: userId,
                email: email,
            },
        });
    }));
}));
//# sourceMappingURL=me.test.js.map