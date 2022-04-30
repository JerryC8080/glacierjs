import { Middleware } from '../type/index';

/**
 * 当 next 没有手动执行将会自动执行。
 * 
 * 例如：
 * ```typescirpt
 * queue.push(async (context) => {
 *  console.log('abc');
 * });
 * ```
 * 
 * 等效于：
 * ```typescript
 * queue.push(async (context, next) => {
 *  console.log('abc');
 *  await next();
 * });
 * ```
 * 
 * @param middleware 
 * @returns Middleware
 */
export const callNextWhileIgnore = (middleware: Middleware): Middleware => {
  const fn: Middleware = async (context, next) => {
    let nextCalled = false;
    const result = await middleware(context, () => {
      nextCalled = true;
      return next();
    });

    if (nextCalled === false) await next();
    return result;
  };

  return fn;
};
