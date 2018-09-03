interface Error {
  path: string;
  message: string;
}

export const normalizeErrors = (errors: Error[]) => {
  const errMap: { [key: string]: string } = {};

  // only displays the last error for now
  errors.forEach(err => {
    errMap[err.path] = err.message;
  });

  return errMap;
};
