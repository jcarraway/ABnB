"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const shortid = require("shortid");
const User_1 = require("./User");
const Listing_1 = require("./Listing");
let Message = class Message extends typeorm_1.BaseEntity {
    addShortLink() {
        this.shortLink = shortid.generate();
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn('uuid'),
    __metadata("design:type", String)
], Message.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ unique: true }),
    __metadata("design:type", String)
], Message.prototype, "shortLink", void 0);
__decorate([
    typeorm_1.Column('text'),
    __metadata("design:type", String)
], Message.prototype, "text", void 0);
__decorate([
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Date)
], Message.prototype, "createdDate", void 0);
__decorate([
    typeorm_1.UpdateDateColumn(),
    __metadata("design:type", Date)
], Message.prototype, "updatedDate", void 0);
__decorate([
    typeorm_1.Column('uuid'),
    __metadata("design:type", String)
], Message.prototype, "userId", void 0);
__decorate([
    typeorm_1.ManyToOne(() => User_1.User),
    __metadata("design:type", User_1.User)
], Message.prototype, "user", void 0);
__decorate([
    typeorm_1.Column('uuid'),
    __metadata("design:type", String)
], Message.prototype, "listingId", void 0);
__decorate([
    typeorm_1.ManyToOne(() => Listing_1.Listing),
    __metadata("design:type", Listing_1.Listing)
], Message.prototype, "listing", void 0);
__decorate([
    typeorm_1.BeforeInsert(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Message.prototype, "addShortLink", null);
Message = __decorate([
    typeorm_1.Entity('messages')
], Message);
exports.Message = Message;
//# sourceMappingURL=Message.js.map