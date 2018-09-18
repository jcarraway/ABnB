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
let Listing = class Listing extends typeorm_1.BaseEntity {
    addShortLink() {
        this.shortLink = shortid.generate();
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn('uuid'),
    __metadata("design:type", String)
], Listing.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ unique: true }),
    __metadata("design:type", String)
], Listing.prototype, "shortLink", void 0);
__decorate([
    typeorm_1.Column('varchar', { length: 100 }),
    __metadata("design:type", String)
], Listing.prototype, "name", void 0);
__decorate([
    typeorm_1.Column('varchar', { length: 100 }),
    __metadata("design:type", String)
], Listing.prototype, "category", void 0);
__decorate([
    typeorm_1.Column('text'),
    __metadata("design:type", String)
], Listing.prototype, "pictureUrl", void 0);
__decorate([
    typeorm_1.Column('varchar', { length: 255 }),
    __metadata("design:type", String)
], Listing.prototype, "description", void 0);
__decorate([
    typeorm_1.Column('int'),
    __metadata("design:type", Number)
], Listing.prototype, "price", void 0);
__decorate([
    typeorm_1.Column('int'),
    __metadata("design:type", Number)
], Listing.prototype, "beds", void 0);
__decorate([
    typeorm_1.Column('int'),
    __metadata("design:type", Number)
], Listing.prototype, "guests", void 0);
__decorate([
    typeorm_1.Column('double precision'),
    __metadata("design:type", Number)
], Listing.prototype, "latitude", void 0);
__decorate([
    typeorm_1.Column('double precision'),
    __metadata("design:type", Number)
], Listing.prototype, "longitude", void 0);
__decorate([
    typeorm_1.Column('text', { array: true }),
    __metadata("design:type", Array)
], Listing.prototype, "amenities", void 0);
__decorate([
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Date)
], Listing.prototype, "createdDate", void 0);
__decorate([
    typeorm_1.UpdateDateColumn(),
    __metadata("design:type", Date)
], Listing.prototype, "updatedDate", void 0);
__decorate([
    typeorm_1.Column('uuid'),
    __metadata("design:type", String)
], Listing.prototype, "userId", void 0);
__decorate([
    typeorm_1.ManyToOne(() => User_1.User, user => user.listings),
    __metadata("design:type", User_1.User)
], Listing.prototype, "user", void 0);
__decorate([
    typeorm_1.BeforeInsert(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Listing.prototype, "addShortLink", null);
Listing = __decorate([
    typeorm_1.Entity('listings')
], Listing);
exports.Listing = Listing;
//# sourceMappingURL=Listing.js.map