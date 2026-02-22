export const executeHandler = async <TResponse>(
  handlerPromise: Promise<TResponse>,
  timeout?: number,
): Promise<TResponse> => {
  return new Promise((resolve, reject) => {
    let timer: any;
    if (timeout) {
      timer = setTimeout(() => reject("TIMEOUT"), timeout);
    }
    
    handlerPromise
      .then((res) => {
        if (timer) clearTimeout(timer);
        resolve(res);
      })
      .catch((err) => {
        if (timer) clearTimeout(timer);
        reject(err);
      });
  });
};