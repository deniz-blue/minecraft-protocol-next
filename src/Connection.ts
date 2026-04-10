import { PacketManager, type IPacketMap } from "./PacketManager";
import type { BinaryStream } from "./BinaryStream";
import type { ProtocolState } from "./types";

/**
 * Class that represents a connection. This is a base class for Client, Server, and ServerClient.
 * It handles serializing and deserializing packets, sending and receiving packets
 * It also has a reference to the protocol version and the current state of the connection (handshaking, status, login, play)
 * It's bound-agnostic, meaning it can be used for both serverbound and clientbound connections.
 */
export class Connection<PacketMap extends IPacketMap = IPacketMap> {
	packets = new PacketManager<PacketMap>();

	state: ProtocolState = "handshaking";

	constructor(
		public socket: BinaryStream,
	) { }
}






