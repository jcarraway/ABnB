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
const yup = require("yup");
const bcrypt = require("bcryptjs");
const common_1 = require("@abb/common");
const forgotPasswordLockAccount_1 = require("../../../utils/forgotPasswordLockAccount");
const createForgotPasswordLink_1 = require("../../../utils/createForgotPasswordLink");
const User_1 = require("../../../entity/User");
const errorMessages_1 = require("./errorMessages");
const constants_1 = require("../../../constants");
const formatYupError_1 = require("../../../utils/formatYupError");
const schema = yup.object().shape({
    newPassword: common_1.passwordValidation,
});
exports.resolvers = {
    Mutation: {
        sendForgotPasswordEmail: (_, { email }, { redis }) => __awaiter(this, void 0, void 0, function* () {
            const user = yield User_1.User.findOne({
                where: {
                    email,
                },
            });
            if (!user) {
                return [
                    {
                        path: 'email',
                        message: errorMessages_1.userNotFoundError,
                    },
                ];
            }
            const userId = user.id;
            yield forgotPasswordLockAccount_1.forgotPasswordLockAccount(userId, redis);
            yield createForgotPasswordLink_1.createForgotPasswordLink('', userId, redis);
            return true;
        }),
        forgotPasswordChange: (_, { newPassword, key }, { redis }) => __awaiter(this, void 0, void 0, function* () {
            const redisKey = `${constants_1.forgotPasswordPrefix}${key}`;
            const userId = yield redis.get(redisKey);
            if (!userId) {
                return [
                    {
                        path: 'key',
                        message: errorMessages_1.expiredKeyError,
                    },
                ];
            }
            try {
                yield schema.validate({ newPassword }, { abortEarly: false });
            }
            catch (err) {
                return formatYupError_1.formatYupError(err);
            }
            const newHashedPassword = yield bcrypt.hash(newPassword, 10);
            const updatePromise = User_1.User.update({ id: userId }, { accountLocked: false, password: newHashedPassword });
            const deleteKeyPromise = redis.del(redisKey);
            yield Promise.all([updatePromise, deleteKeyPromise]);
            return null;
        }),
    },
};
//# sourceMappingURL=resolvers.js.map