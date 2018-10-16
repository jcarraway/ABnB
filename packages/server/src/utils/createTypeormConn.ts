import { createConnection, getConnectionOptions } from 'typeorm';
// import { User } from '../entity/User';
// import { Listing } from '../entity/Listing';

export const createTypeormConn = async () => {
  const connectionOptions = await getConnectionOptions(process.env.NODE_ENV);
  return process.env.NODE_ENV === 'production'
    ? createConnection({
        ...connectionOptions,
        url: process.env.DATABASE_URL as string,
        entities: [process.env.TYPEORM_ENTITIES],
        name: 'default',
      } as any).then(connection => console.log('connected', connection))
    : createConnection({ ...connectionOptions, name: 'default' }).then(
        connection => console.log('connected', connection)
      );
};
