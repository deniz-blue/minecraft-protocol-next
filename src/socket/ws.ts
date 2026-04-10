import type { BinaryStream } from "../BinaryStream";

export class WebSocketConnection implements BinaryStream {
	readable: ReadableStream<Uint8Array>;
	writable: WritableStream<Uint8Array>;

	constructor(public readonly socket: WebSocket) {
		this.readable = new ReadableStream<Uint8Array>({
			start: (controller) => {
				socket.addEventListener("message", (event) => {
					if (event.data instanceof ArrayBuffer) {
						controller.enqueue(new Uint8Array(event.data));
					} else if (typeof event.data === "string") {
						controller.enqueue(new TextEncoder().encode(event.data));
					}
				});
				socket.addEventListener("close", () => controller.close());
				socket.addEventListener("error", (err) => controller.error(err));
			},
			cancel: () => {
				socket.close();
			},
		});

		this.writable = new WritableStream<Uint8Array>({
			write: (chunk) => {
				return new Promise((resolve, reject) => {
					try {
						socket.send(chunk.buffer as ArrayBuffer);
						resolve();
					} catch (err) {
						reject(err);
					}
				});
			},
			close: () => void socket.close(),
			abort: (err) => void socket.close(),
		});
	}
}
