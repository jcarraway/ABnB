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
const Listing_1 = require("../../../entity/Listing");
const isAuthenticated_1 = require("../../../middleware/isAuthenticated");
exports.resolvers = {
    Mutation: {
        createListing: (_, { input }, { session }) => __awaiter(this, void 0, void 0, function* () {
            isAuthenticated_1.isAuthenticated(session);
            yield Listing_1.Listing.create(Object.assign({}, input, { pictureUrl: '', userId: session.userId })).save();
            return true;
        }),
    },
};
//# sourceMappingURL=resolvers.js.map