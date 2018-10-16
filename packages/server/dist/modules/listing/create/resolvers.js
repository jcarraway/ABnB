"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const shortid = require("shortid");
const fs_1 = require("fs");
const Listing_1 = require("../../../entity/Listing");
const storeUpload = (stream, mimetype) => __awaiter(this, void 0, void 0, function* () {
    const extension = mimetype.split('/')[1];
    const id = `${shortid.generate()}.${extension}`;
    const path = `images/${id}`;
    return new Promise((resolve, reject) => stream
        .pipe(fs_1.createWriteStream(path))
        .on('finish', () => resolve({ id, path }))
        .on('error', reject));
});
const processUpload = (upload) => __awaiter(this, void 0, void 0, function* () {
    const { stream, mimetype } = yield upload;
    const { id } = yield storeUpload(stream, mimetype);
    return id;
});
exports.resolvers = {
    Mutation: {
        createListing: (_, _a, { session }) => { var _b, picture, data; return __awaiter(this, void 0, void 0, function* () {
            _b = _a.input, { picture } = _b, data = __rest(_b, ["picture"]);
            const pictureUrl = picture ? yield processUpload(picture) : null;
            yield Listing_1.Listing.create(Object.assign({}, data, { pictureUrl, userId: session.userId })).save();
            return true;
        }); },
    },
};
//# sourceMappingURL=resolvers.js.map