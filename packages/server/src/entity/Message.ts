import {
  Entity,
  Column,
  BeforeInsert,
  BaseEntity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import * as shortid from 'shortid';

import { User } from './User';
import { Listing } from './Listing';

@Entity('messages')
export class Message extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  shortLink: string;

  @Column('text')
  text: string;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @Column('uuid')
  userId: string;

  @ManyToOne(() => User)
  user: User;

  @Column('uuid')
  listingId: string;

  @ManyToOne(() => Listing)
  listing: Listing;

  @BeforeInsert()
  addShortLink() {
    this.shortLink = shortid.generate();
  }
}
