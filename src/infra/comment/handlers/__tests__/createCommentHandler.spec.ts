import { createCommentHandler } from "@qcr/infra/comment/handlers";
import { generate } from "@qcr/domain/Identity";
import { createComment } from "@qcr/domain/Comment";
import { createCommentAction } from "@qcr/infra/comment/actions";

it("should throw when session missing", () => {
  const handle = createCommentHandler({
    session: null,
    entries: {
      blocks: {},
      comments: {},
    },
  });

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
    session: {
      id: generate(),
      private: false,
    },
    entries: {
      blocks: {},
      comments: {},
    },
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
    session: {
      id: sessionId,
      private: false,
    },
    entries: {
      blocks: {
        [blockId]: { content: "", id: blockId, sessionId },
      },
      comments: {
        [commentId]: {
          id: commentId,
          blockId,
          isOpen: false,
          line: 10,
          resolved: false,
          sessionId,
          submited: true,
          message: "Something",
        },
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
    session: {
      id: sessionId,
      private: false,
    },
    entries: {
      blocks: {
        [blockId]: { content: "", id: blockId, sessionId },
      },
      comments: {
        [commentId]: {
          id: commentId,
          blockId,
          isOpen: false,
          line: 1,
          resolved: false,
          sessionId,
          submited: true,
          message: "Something",
        },
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
