# TODO

Implementation-first checklist for `minecraft-protocol-next`.
Assumption: primitive/value codecs are provided by `protodef-next`.

## 1. Public API surface (what users import)
- [ ] `src/index.ts`: export stable top-level APIs only
- [ ] `src/client/createClient.ts`: factory for protocol client
- [ ] `src/server/createServer.ts`: factory for protocol server
- [ ] `src/types/public.ts`: shared public types (`ProtocolState`, `Packet`, `ClientOptions`, etc.)
- [ ] Define event names/payloads exposed publicly

## 2. Core protocol runtime modules
- [ ] `src/protocol/states.ts`: handshake/status/login/play state enum + transitions
- [ ] `src/protocol/registry.ts`: packet ID <-> packet name mapping per state/direction
- [ ] `src/protocol/serializer.ts`: packet object -> frame bytes (using `protodef-next`)
- [ ] `src/protocol/deserializer.ts`: frame bytes -> packet object (using `protodef-next`)
- [ ] `src/protocol/errors.ts`: typed protocol/runtime errors

## 3. Transport layer modules
- [ ] `src/net/connection.ts`: wraps Node TCP socket and lifecycle
- [ ] `src/net/frameReader.ts`: accumulates partial reads into complete frames
- [ ] `src/net/frameWriter.ts`: writes length-prefixed frames safely
- [ ] `src/net/backpressure.ts`: queue/drain strategy for high traffic

## 4. Packet model modules
- [ ] `src/packets/definitions/`: packet schemas by state + direction
- [ ] `src/packets/types/`: TypeScript packet interfaces/types
- [ ] `src/packets/packetFactory.ts`: construct packet objects from typed inputs
- [ ] `src/packets/packetValidator.ts`: runtime packet shape checks before encode

## 5. Session and state machine
- [ ] `src/session/session.ts`: per-connection protocol context
- [ ] `src/session/stateMachine.ts`: guard valid packet flow by current state
- [ ] `src/session/keepAlive.ts`: ping/pong bookkeeping and timeouts
- [ ] `src/session/disconnect.ts`: structured disconnect reasons + close behavior

## 6. MVP features to implement first
- [ ] Handshake flow (set next state)
- [ ] Status flow (`status_request`, `status_response`)
- [ ] Ping flow (`ping_request`, `ping_response`)
- [ ] Status-only server example in `examples/status-server.ts`
- [ ] Status-only client example in `examples/status-client.ts`

## 7. Tests (by module)
- [ ] `tests/protocol/serializer.test.ts`: encode path for MVP packets
- [ ] `tests/protocol/deserializer.test.ts`: decode path for MVP packets
- [ ] `tests/net/frameReader.test.ts`: partial frame assembly behavior
- [ ] `tests/session/stateMachine.test.ts`: transition guards
- [ ] `tests/integration/status-roundtrip.test.ts`: client/server end-to-end status

## 8. Non-functional aspects
- [ ] Error strategy: classify recoverable vs fatal errors
- [ ] Logging strategy: debug hooks with packet-level tracing toggle
- [ ] Performance baseline: simple benchmark for encode/decode + frame handling
- [ ] Compatibility strategy: how version-agnostic behavior is validated

## 9. Release readiness
- [ ] Verify `exports` output paths and generated `.d.ts`
- [ ] Add npm `files` allowlist
- [ ] Add README API docs for client/server usage
- [ ] Publish `0.1.0-alpha` and test install in a clean project
