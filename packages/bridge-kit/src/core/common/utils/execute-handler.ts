export const executeHandler = async <TResponse>(
  handlerPromise: Promise<TResponse>,
  timeout: number,
): Promise<TResponse> => {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject("TIMEOUT"), timeout);
    handlerPromise
      .then((res) => {
        clearTimeout(timer);
        resolve(res);
      })
      .catch((err) => {
        clearTimeout(timer);
        reject(err);
      });
  });
};