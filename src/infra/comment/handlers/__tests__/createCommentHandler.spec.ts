import { createCommentHandler } from "@qcr/infra/comment/handlers";
import { createCommentAction } from "@qcr/infra/comment/actions";
import { rootReducer } from "@qcr/infra/rootState";
import {
  createSession,
  createBlock,
  createComment,
  generate,
} from "@qcr/domain";

const rootState = rootReducer(undefined, {});

it("should throw when session missing", () => {
  const handle = createCommentHandler(rootState);

  expect(() =>
    handle(
      createCommentAction({
        blockId: generate(),
        line: 1,
        id: generate(),
      })
    )
  ).toThrowError("Session missing");
});

it("should throw when block missing", () => {
  const handle = createCommentHandler({
    ...rootState,
    session: createSession({ id: generate() }),
  });

  expect(() =>
    handle(
      createCommentAction({
        blockId: generate(),
        line: 1,
        id: generate(),
      })
    )
  ).toThrowError("Block not exists");
});

it("should throw when line taken by other comment", () => {
  const blockId = generate();
  const sessionId = generate();
  const commentId = generate();

  const handle = createCommentHandler({
    session: createSession({ id: sessionId }),
    entries: {
      blocks: {
        [blockId]: createBlock({ id: blockId, content: "", sessionId }),
      },
      comments: {
        [commentId]: createComment({
          id: generate(),
          line: 10,
          blockId,
          sessionId,
        }),
      },
    },
  });

  expect(() =>
    handle(
      createCommentAction({
        blockId,
        line: 10,
        id: generate(),
      })
    )
  ).toThrowError("Comment at this line already exists");
});

it("should add comment", () => {
  const blockId = generate();
  const sessionId = generate();
  const commentId = generate();

  const rootState = {
    session: createSession({ id: sessionId }),
    entries: {
      blocks: {
        [blockId]: createBlock({
          id: blockId,
          sessionId,
          content: "",
        }),
      },
      comments: {
        [commentId]: createComment({
          id: commentId,
          blockId,
          line: 1,
          sessionId,
        }),
      },
    },
  };

  const handle = createCommentHandler(rootState);

  const commentToAddPayload = {
    blockId,
    line: 10,
    id: generate(),
  };

  expect(handle(createCommentAction(commentToAddPayload))).toEqual({
    ...rootState.entries.comments,
    [commentToAddPayload.id]: createComment({
      ...commentToAddPayload,
      sessionId,
    }),
  });
});
