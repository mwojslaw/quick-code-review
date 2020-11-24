import { updateCommentAction } from "@qcr/infra/comment/actions";
import { updateCommentHandler } from "@qcr/infra/comment/handlers";
import { createComment, updateComment } from "@qcr/domain/Comment";
import { generate } from "@qcr/domain/Identity";

it("should thow comment not exist", () => {
  const handle = updateCommentHandler({
    entries: { comments: {}, blocks: {} },
    session: { id: generate(), private: false },
  });

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
    entries: {
      comments: {
        [commentId]: commentUpdate,
      },
      blocks: {},
    },
    session: { id: sessionId, private: false },
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
