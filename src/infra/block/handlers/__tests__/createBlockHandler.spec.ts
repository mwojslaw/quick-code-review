import {
  createBlockAction,
  createBlockHandler,
  BlocksState,
} from "@qcr/infra/block";
import { rootReducer } from "@qcr/infra/rootState";
import { generate, createBlock } from "@qcr/domain";
import { createSessionAction } from "@qcr/infra/session";

const initialRootState = rootReducer(undefined, {});

it("should throw when session missing", () => {
  const handle = createBlockHandler(initialRootState);

  expect(() =>
    handle(
      createBlockAction({
        id: generate(),
        content: "",
      })
    )
  ).toThrowError("Session missing");
});

it("should add block", () => {
  const blockId = generate();
  const sessionId = generate();

  const rootState = rootReducer(
    initialRootState,
    createSessionAction({
      id: sessionId,
    })
  );

  const handle = createBlockHandler(rootState);

  expect(
    handle(
      createBlockAction({
        id: blockId,
        content: "",
      })
    )
  ).toEqual<BlocksState>({
    [blockId]: createBlock({
      id: blockId,
      content: "",
      sessionId,
    }),
  });
});
