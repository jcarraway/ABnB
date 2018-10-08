const isAuthenticated = async (
  resolve: any,
  parent: any,
  args: any,
  context: any,
  info: any
) => {
  if (!context.session.userId) {
    console.log('session from middleware', context.session);
    throw new Error('not authenticated from graphql middleware');
  }

  return resolve(parent, args, context, info);
};

export const middleware = {
  Mutation: {
    createListing: isAuthenticated,
    deleteListing: isAuthenticated,
  },
};
