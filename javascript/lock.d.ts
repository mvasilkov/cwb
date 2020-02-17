/**
 * An asynchronous sleep function.
 * @param pause Wait time in milliseconds (optional)
 */
export declare const sleep: (pause?: number | undefined) => Promise<unknown>;
declare type CriticalSection<T> = () => T | Promise<T>;
/**
 * Locking (synchronization)
 * @param key A string that uniquely identifies the lock.
 * @param fun Critical section. This function can be async.
 * @param wait The timeout interval (optional).
 */
export declare function lock<T>(key: string, fun: CriticalSection<T>, wait?: number): Promise<T>;
export default lock;
