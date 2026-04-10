import { createNanoEvents } from "nanoevents";

export type IPacketMap = Record<string, any>;

/** Send queue and listener management */
export class PacketManager<PacketMap extends IPacketMap = IPacketMap> {
	#receiveEmitter = createNanoEvents<{
		[PacketId in keyof PacketMap]: (data: PacketMap[PacketId]) => void;
	}>();
	
	on = this.#receiveEmitter.on.bind(this.#receiveEmitter);

	#sendQueue: { id: keyof PacketMap; data: PacketMap[keyof PacketMap] }[] = [];

	/** Send a packet to the other side */
	send<PacketId extends keyof PacketMap>(id: PacketId, data: PacketMap[PacketId]) {
		this.#sendQueue.push({ id, data });
	}
}
