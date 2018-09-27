import * as DataLoader from 'dataloader';
import { User } from '../entity/User';

type BatchUser = (ids: string[]) => Promise<User[]>;

const batchUsers: BatchUser = async ids => {
  // get all users in one req
  const users = await User.findByIds(ids);

  // return them in the correct order
  const userMap: { [key: string]: User } = {};
  users.forEach(u => {
    userMap[u.id] = u;
  });

  return ids.map(id => userMap[id]);
};

export const userLoader = () => new DataLoader<string, User>(batchUsers);
