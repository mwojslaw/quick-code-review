import { createSession, generate } from "@qcr/domain";
import { createSessionAction, createSessionHandler } from "@qcr/infra/session";
import { rootReducer } from "@qcr/infra/rootState";

it("should throw when session exists", () => {
  const rootState = rootReducer(
    undefined,
    createSessionAction({ id: generate() })
  );

  const handle = createSessionHandler(rootState);

  expect(() =>
    handle(
      createSessionAction({
        id: generate(),
      })
    )
  ).toThrowError("Session already created");
});

it("should create session", () => {
  const sessionId = generate();

  const rootState = rootReducer(undefined, {});

  const handle = createSessionHandler(rootState);

  expect(
    handle(
      createSessionAction({
        id: sessionId,
      })
    )
  ).toEqual(createSession({ id: sessionId }));
});
