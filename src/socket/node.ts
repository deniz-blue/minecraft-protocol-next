import { Socket } from "node:net";
import type { BinaryStream } from "../BinaryStream";

export class NodeSocketConnection implements BinaryStream {
	readable: ReadableStream<Uint8Array<ArrayBufferLike>>;
	writable: WritableStream<Uint8Array<ArrayBufferLike>>;

	constructor(public readonly socket: Socket) {
		this.readable = new ReadableStream<Uint8Array>({
			start: (controller) => {
				socket.on("data", (chunk: Buffer<ArrayBuffer>) => controller.enqueue(new Uint8Array(chunk)));
				socket.on("end", () => controller.close());
				socket.on("error", (err) => controller.error(err));
			},
			cancel: () => {
				socket.end();
			},
		});

		this.writable = new WritableStream<Uint8Array>({
			write: (chunk) => {
				return new Promise((resolve, reject) => {
					socket.write(chunk, (err) => {
						if (err) reject(err);
						else resolve();
					});
				});
			},
			close: () => void socket.end(),
			abort: (err) => void socket.destroy(err),
		});
	}
}

