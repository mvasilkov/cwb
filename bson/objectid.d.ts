type TypedArray = Uint8Array | Uint8ClampedArray | Uint16Array | Uint32Array | Int8Array | Int16Array | Int32Array | Float32Array | Float64Array;
type ArrayBufferView = TypedArray | DataView;

// Buffer class
type BufferEncoding = "ascii" | "utf8" | "utf-8" | "utf16le" | "ucs2" | "ucs-2" | "base64" | "latin1" | "binary" | "hex";

/**
 * Raw data is stored in instances of the Buffer class.
 * A Buffer is similar to an array of integers but corresponds to a raw memory allocation outside the V8 heap.  A Buffer cannot be resized.
 * Valid string encodings: 'ascii'|'utf8'|'utf16le'|'ucs2'(alias of 'utf16le')|'base64'|'binary'(deprecated)|'hex'
 */
declare class Buffer extends Uint8Array {
    /**
     * Allocates a new buffer containing the given {str}.
     *
     * @param str String to store in buffer.
     * @param encoding encoding to use, optional.  Default is 'utf8'
     * @deprecated since v10.0.0 - Use `Buffer.from(string[, encoding])` instead.
     */
    constructor(str: string, encoding?: BufferEncoding);
    /**
     * Allocates a new buffer of {size} octets.
     *
     * @param size count of octets to allocate.
     * @deprecated since v10.0.0 - Use `Buffer.alloc()` instead (also see `Buffer.allocUnsafe()`).
     */
    constructor(size: number);
    /**
     * Allocates a new buffer containing the given {array} of octets.
     *
     * @param array The octets to store.
     * @deprecated since v10.0.0 - Use `Buffer.from(array)` instead.
     */
    constructor(array: Uint8Array);
    /**
     * Produces a Buffer backed by the same allocated memory as
     * the given {ArrayBuffer}/{SharedArrayBuffer}.
     *
     *
     * @param arrayBuffer The ArrayBuffer with which to share memory.
     * @deprecated since v10.0.0 - Use `Buffer.from(arrayBuffer[, byteOffset[, length]])` instead.
     */
    constructor(arrayBuffer: ArrayBuffer | SharedArrayBuffer);
    /**
     * Allocates a new buffer containing the given {array} of octets.
     *
     * @param array The octets to store.
     * @deprecated since v10.0.0 - Use `Buffer.from(array)` instead.
     */
    constructor(array: any[]);
    /**
     * Copies the passed {buffer} data onto a new {Buffer} instance.
     *
     * @param buffer The buffer to copy.
     * @deprecated since v10.0.0 - Use `Buffer.from(buffer)` instead.
     */
    constructor(buffer: Buffer);
    /**
     * When passed a reference to the .buffer property of a TypedArray instance,
     * the newly created Buffer will share the same allocated memory as the TypedArray.
     * The optional {byteOffset} and {length} arguments specify a memory range
     * within the {arrayBuffer} that will be shared by the Buffer.
     *
     * @param arrayBuffer The .buffer property of any TypedArray or a new ArrayBuffer()
     */
    static from(arrayBuffer: ArrayBuffer | SharedArrayBuffer, byteOffset?: number, length?: number): Buffer;
    /**
     * Creates a new Buffer using the passed {data}
     * @param data data to create a new Buffer
     */
    static from(data: number[]): Buffer;
    static from(data: Uint8Array): Buffer;
    /**
     * Creates a new buffer containing the coerced value of an object
     * A `TypeError` will be thrown if {obj} has not mentioned methods or is not of other type appropriate for `Buffer.from()` variants.
     * @param obj An object supporting `Symbol.toPrimitive` or `valueOf()`.
     */
    static from(obj: { valueOf(): string | object } | { [Symbol.toPrimitive](hint: 'string'): string }, byteOffset?: number, length?: number): Buffer;
    /**
     * Creates a new Buffer containing the given JavaScript string {str}.
     * If provided, the {encoding} parameter identifies the character encoding.
     * If not provided, {encoding} defaults to 'utf8'.
     */
    static from(str: string, encoding?: BufferEncoding): Buffer;
    /**
     * Creates a new Buffer using the passed {data}
     * @param values to create a new Buffer
     */
    static of(...items: number[]): Buffer;
    /**
     * Returns true if {obj} is a Buffer
     *
     * @param obj object to test.
     */
    static isBuffer(obj: any): obj is Buffer;
    /**
     * Returns true if {encoding} is a valid encoding argument.
     * Valid string encodings in Node 0.12: 'ascii'|'utf8'|'utf16le'|'ucs2'(alias of 'utf16le')|'base64'|'binary'(deprecated)|'hex'
     *
     * @param encoding string to test.
     */
    static isEncoding(encoding: string): encoding is BufferEncoding;
    /**
     * Gives the actual byte length of a string. encoding defaults to 'utf8'.
     * This is not the same as String.prototype.length since that returns the number of characters in a string.
     *
     * @param string string to test.
     * @param encoding encoding used to evaluate (defaults to 'utf8')
     */
    static byteLength(
        string: string | ArrayBufferView | ArrayBuffer | SharedArrayBuffer,
        encoding?: BufferEncoding
    ): number;
    /**
     * Returns a buffer which is the result of concatenating all the buffers in the list together.
     *
     * If the list has no items, or if the totalLength is 0, then it returns a zero-length buffer.
     * If the list has exactly one item, then the first item of the list is returned.
     * If the list has more than one item, then a new Buffer is created.
     *
     * @param list An array of Buffer objects to concatenate
     * @param totalLength Total length of the buffers when concatenated.
     *   If totalLength is not provided, it is read from the buffers in the list. However, this adds an additional loop to the function, so it is faster to provide the length explicitly.
     */
    static concat(list: Uint8Array[], totalLength?: number): Buffer;
    /**
     * The same as buf1.compare(buf2).
     */
    static compare(buf1: Uint8Array, buf2: Uint8Array): number;
    /**
     * Allocates a new buffer of {size} octets.
     *
     * @param size count of octets to allocate.
     * @param fill if specified, buffer will be initialized by calling buf.fill(fill).
     *    If parameter is omitted, buffer will be filled with zeros.
     * @param encoding encoding used for call to buf.fill while initalizing
     */
    static alloc(size: number, fill?: string | Buffer | number, encoding?: BufferEncoding): Buffer;
    /**
     * Allocates a new buffer of {size} octets, leaving memory not initialized, so the contents
     * of the newly created Buffer are unknown and may contain sensitive data.
     *
     * @param size count of octets to allocate
     */
    static allocUnsafe(size: number): Buffer;
    /**
     * Allocates a new non-pooled buffer of {size} octets, leaving memory not initialized, so the contents
     * of the newly created Buffer are unknown and may contain sensitive data.
     *
     * @param size count of octets to allocate
     */
    static allocUnsafeSlow(size: number): Buffer;
    /**
     * This is the number of bytes used to determine the size of pre-allocated, internal Buffer instances used for pooling. This value may be modified.
     */
    static poolSize: number;

    write(string: string, encoding?: BufferEncoding): number;
    write(string: string, offset: number, encoding?: BufferEncoding): number;
    write(string: string, offset: number, length: number, encoding?: BufferEncoding): number;
    toString(encoding?: string, start?: number, end?: number): string;
    toJSON(): { type: 'Buffer'; data: number[] };
    equals(otherBuffer: Uint8Array): boolean;
    compare(
        otherBuffer: Uint8Array,
        targetStart?: number,
        targetEnd?: number,
        sourceStart?: number,
        sourceEnd?: number
    ): number;
    copy(targetBuffer: Uint8Array, targetStart?: number, sourceStart?: number, sourceEnd?: number): number;
    /**
     * Returns a new `Buffer` that references **the same memory as the original**, but offset and cropped by the start and end indices.
     *
     * This method is incompatible with `Uint8Array#slice()`, which returns a copy of the original memory.
     *
     * @param begin Where the new `Buffer` will start. Default: `0`.
     * @param end Where the new `Buffer` will end (not inclusive). Default: `buf.length`.
     */
    slice(begin?: number, end?: number): Buffer;
    /**
     * Returns a new `Buffer` that references **the same memory as the original**, but offset and cropped by the start and end indices.
     *
     * This method is compatible with `Uint8Array#subarray()`.
     *
     * @param begin Where the new `Buffer` will start. Default: `0`.
     * @param end Where the new `Buffer` will end (not inclusive). Default: `buf.length`.
     */
    subarray(begin?: number, end?: number): Buffer;
    writeUIntLE(value: number, offset: number, byteLength: number): number;
    writeUIntBE(value: number, offset: number, byteLength: number): number;
    writeIntLE(value: number, offset: number, byteLength: number): number;
    writeIntBE(value: number, offset: number, byteLength: number): number;
    readUIntLE(offset: number, byteLength: number): number;
    readUIntBE(offset: number, byteLength: number): number;
    readIntLE(offset: number, byteLength: number): number;
    readIntBE(offset: number, byteLength: number): number;
    readUInt8(offset: number): number;
    readUInt16LE(offset: number): number;
    readUInt16BE(offset: number): number;
    readUInt32LE(offset: number): number;
    readUInt32BE(offset: number): number;
    readInt8(offset: number): number;
    readInt16LE(offset: number): number;
    readInt16BE(offset: number): number;
    readInt32LE(offset: number): number;
    readInt32BE(offset: number): number;
    readFloatLE(offset: number): number;
    readFloatBE(offset: number): number;
    readDoubleLE(offset: number): number;
    readDoubleBE(offset: number): number;
    reverse(): this;
    swap16(): Buffer;
    swap32(): Buffer;
    swap64(): Buffer;
    writeUInt8(value: number, offset: number): number;
    writeUInt16LE(value: number, offset: number): number;
    writeUInt16BE(value: number, offset: number): number;
    writeUInt32LE(value: number, offset: number): number;
    writeUInt32BE(value: number, offset: number): number;
    writeInt8(value: number, offset: number): number;
    writeInt16LE(value: number, offset: number): number;
    writeInt16BE(value: number, offset: number): number;
    writeInt32LE(value: number, offset: number): number;
    writeInt32BE(value: number, offset: number): number;
    writeFloatLE(value: number, offset: number): number;
    writeFloatBE(value: number, offset: number): number;
    writeDoubleLE(value: number, offset: number): number;
    writeDoubleBE(value: number, offset: number): number;

    fill(value: string | Uint8Array | number, offset?: number, end?: number, encoding?: BufferEncoding): this;

    indexOf(value: string | number | Uint8Array, byteOffset?: number, encoding?: BufferEncoding): number;
    lastIndexOf(value: string | number | Uint8Array, byteOffset?: number, encoding?: BufferEncoding): number;
    entries(): IterableIterator<[number, number]>;
    includes(value: string | number | Buffer, byteOffset?: number, encoding?: BufferEncoding): boolean;
    keys(): IterableIterator<number>;
    values(): IterableIterator<number>;
}

/**
 * A class representation of the BSON ObjectId type.
 */
export class ObjectId {
    /**
     * Create a new ObjectId instance
     * @param {(string|Buffer|number|ObjectId)} id Can be a 24 byte hex string, 12 byte binary Buffer, or a Number.
     */
    constructor(id?: string | Buffer | number | ObjectId);
    /** The generation time of this ObjectId instance */
    generationTime: number;
    /** If true cache the hex string representation of ObjectId */
    static cacheHexString?: boolean;
    /**
     * Creates an ObjectId from a hex string representation of an ObjectId.
     * @param {string} hexString create a ObjectId from a passed in 24 byte hexstring.
     * @return {ObjectId} return the created ObjectId
     */
    static createFromHexString(hexString: string): ObjectId;
    /**
     * Creates an ObjectId from a second based number, with the rest of the ObjectId zeroed out. Used for comparisons or sorting the ObjectId.
     * @param {number} time an integer number representing a number of seconds.
     * @return {ObjectId} return the created ObjectId
     */
    static createFromTime(time: number): ObjectId;
    /**
     * Checks if a value is a valid bson ObjectId
     * @param {(string|Buffer|number|ObjectId)} id ObjectId instance to validate.
     * @return {boolean} return true if the value is a valid bson ObjectId, return false otherwise.
     */
    static isValid(id: string | Buffer | number | ObjectId): boolean;
    /**
     * Compares the equality of this ObjectId with `otherID`.
     * @param {ObjectId|string} otherID ObjectId instance to compare against.
     * @return {boolean} the result of comparing two ObjectId's
     */
    equals(otherID: ObjectId | string): boolean;
    /**
     * Generate a 12 byte id string used in ObjectId's
     * @param {number} time optional parameter allowing to pass in a second based timestamp.
     * @return {string} return the 12 byte id binary string.
     */
    static generate(time?: number): Buffer;
    /**
     * Returns the generation date (accurate up to the second) that this ID was generated.
     * @return {Date} the generation date
     */
    getTimestamp(): Date;
    /**
     * Return the ObjectId id as a 24 byte hex string representation
     * @return {string} return the 24 byte hex string representation.
     */
    toHexString(): string;
}
