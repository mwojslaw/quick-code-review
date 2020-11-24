import { submitCommentAction } from "@qcr/infra/comment/actions";
import { createSessionAction } from "@qcr/infra/session/actions";
import { submitCommentHandler } from "@qcr/infra/comment/handlers";
import { submitComment, createComment } from "@qcr/domain/Comment";
import { generate } from "@qcr/domain/Identity";
import { rootReducer } from "@qcr/infra/rootState";

const initialRootState = rootReducer(
  undefined,
  createSessionAction({ id: generate() })
);

it("should thow comment not exist", () => {
  const handle = submitCommentHandler(initialRootState);

  expect(() =>
    handle(
      submitCommentAction({
        id: generate(),
      })
    )
  ).toThrowError("Comment not found");
});

it("should thow if component already submited", () => {
  const commentId = generate();
  const sessionId = generate();

  const commentToSubmit = submitComment(
    createComment({
      id: commentId,
      blockId: generate(),
      line: 10,
      sessionId,
    })
  );

  const rootState = {
    ...initialRootState,
    entries: {
      ...initialRootState.entries,
      comments: {
        [commentId]: commentToSubmit,
      },
    },
  };

  const handle = submitCommentHandler(rootState);

  expect(() =>
    handle(
      submitCommentAction({
        id: commentId,
      })
    )
  ).toThrowError("Comment already submited!");
});

it("should submit comment", () => {
  const commentId = generate();
  const sessionId = generate();

  const commentToSubmit = createComment({
    id: commentId,
    blockId: generate(),
    line: 10,
    sessionId,
  });

  const rootState = {
    ...initialRootState,
    entries: {
      ...initialRootState.entries,
      comments: {
        [commentId]: commentToSubmit,
      },
    },
  };

  const handle = submitCommentHandler(rootState);

  expect(
    handle(
      submitCommentAction({
        id: commentId,
      })
    )
  ).toEqual({
    ...rootState.entries.comments,
    [commentId]: submitComment(commentToSubmit),
  });
});
