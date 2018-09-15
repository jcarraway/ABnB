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

@Entity('listings')
export class Listing extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  shortLink: string;

  @Column('varchar', { length: 100 })
  name: string;

  @Column('varchar', { length: 100 })
  category: string;

  @Column('text')
  pictureUrl: string;

  @Column('varchar', { length: 255 })
  description: string;

  @Column('int')
  price: number;

  @Column('int')
  beds: number;

  @Column('int')
  guests: number;

  @Column('double precision')
  latitude: number;

  @Column('double precision')
  longitude: number;

  @Column('text', { array: true })
  amenities: string[];

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @Column('uuid')
  userId: string;

  @ManyToOne(() => User, user => user.listings)
  user: User;

  @BeforeInsert()
  addShortLink() {
    this.shortLink = shortid.generate();
  }
}
