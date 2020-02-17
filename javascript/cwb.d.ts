import EventEmitter from 'wolfy87-eventemitter';
import ObjectId from '../bson/objectid';
import { sleep, lock } from './lock';
declare type QueuedEvent = {
    pk: string;
    event: string;
    args: any[];
};
interface SendOptions {
    pk?: string;
    toSelf?: boolean;
}
declare class Channel extends EventEmitter {
    key: string;
    queueSize: number;
    queueTTL: number;
    seenEvents: Set<string>;
    started: number;
    disposed: boolean;
    constructor(key: string, queueSize?: number, queueTTL?: number);
    onstorage: (event: StorageEvent) => void;
    cleanup: () => Promise<void>;
    send(event: string, args: any[], options?: SendOptions): Promise<void>;
    update(): void;
    dispose(): void;
    queueLoad(): QueuedEvent[];
    queueSave(queue: QueuedEvent[]): void;
    queueConsume(queue: QueuedEvent[]): void;
}
export default Channel;
export { Channel, EventEmitter, ObjectId, sleep, lock, };
