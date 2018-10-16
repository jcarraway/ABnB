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
const Message_1 = require("../../../entity/Message");
const constants_1 = require("../shared/constants");
exports.resolvers = {
    Mutation: {
        createMessage: (_, { message }, { session, pubsub }) => __awaiter(this, void 0, void 0, function* () {
            const dbMessage = yield Message_1.Message.create(Object.assign({}, message, { userId: session.userId })).save();
            pubsub.publish(constants_1.PUBSUB_NEW_MESSAGE, {
                newMessage: dbMessage
            });
            return true;
        }),
    },
};
//# sourceMappingURL=resolvers.js.map