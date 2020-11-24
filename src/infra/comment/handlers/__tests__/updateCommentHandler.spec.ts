import { updateCommentAction } from "@qcr/infra/comment/actions";
import { updateCommentHandler } from "@qcr/infra/comment/handlers";
import { createComment, updateComment } from "@qcr/domain/Comment";
import { generate } from "@qcr/domain/Identity";
import { rootReducer } from "@qcr/infra/rootState";
import { createSessionAction } from "@qcr/infra/session/actions";

const initialRootState = rootReducer(
  undefined,
  createSessionAction({ id: generate() })
);

it("should thow comment not exist", () => {
  const handle = updateCommentHandler(initialRootState);

  expect(() =>
    handle(
      updateCommentAction({
        id: generate(),
        message: "lala",
      })
    )
  ).toThrowError("Comment not found");
});

it("should submit comment", () => {
  const commentId = generate();
  const sessionId = generate();

  const commentUpdate = createComment({
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
        [commentId]: commentUpdate,
      },
    },
  };

  const handle = updateCommentHandler(rootState);

  expect(
    handle(
      updateCommentAction({
        id: commentId,
        message: "lala",
      })
    )
  ).toEqual({
    ...rootState.entries.comments,
    [commentId]: updateComment({
      comment: commentUpdate,
      message: "lala",
    }),
  });
});
