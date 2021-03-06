import {
  Entity,
  Column,
  BeforeInsert,
  BaseEntity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import * as shortid from 'shortid';
import * as bcrypt from 'bcryptjs';

import { Listing } from './Listing';
import { Message } from './Message';

@Entity('users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  shortLink: string;

  @Column('varchar', { length: 255 })
  email: string;

  @Column('text')
  password: string;

  @Column('boolean', { default: false })
  confirmed: boolean;

  @Column('boolean', { default: false })
  accountLocked: boolean;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @OneToMany(() => Listing, listing => listing.user)
  listings: Listing[];

  @OneToMany(() => Message, message => message.user)
  messages: Message[];

  @BeforeInsert()
  addShortLink() {
    this.shortLink = shortid.generate();
  }

  @BeforeInsert()
  async hashPasswordBeforeInsert() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
