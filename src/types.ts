export type Identifier = `${string}:${string}`;

export type ProtocolState =
	| ProtocolState.Handshaking
	| ProtocolState.Status
	| ProtocolState.Login
	| ProtocolState.Configuration
	| ProtocolState.Play

namespace ProtocolState {
	export type Handshaking = "handshaking";
	export type Status = "status";
	export type Login = "login";
	export type Configuration = "configuration";
	export type Play = "play";
} 
