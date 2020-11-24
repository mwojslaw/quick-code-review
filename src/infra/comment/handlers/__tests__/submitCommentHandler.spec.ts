import { submitCommentAction } from "@qcr/infra/comment/actions";
import { submitCommentHandler } from "@qcr/infra/comment/handlers";
import { submitComment, createComment } from "@qcr/domain/Comment";
import { generate } from "@qcr/domain/Identity";

it("should thow comment not exist", () => {
  const handle = submitCommentHandler({
    entries: { comments: {}, blocks: {} },
    session: { id: generate(), private: false },
  });

  expect(() =>
    handle(
      submitCommentAction({
        id: generate(),
      })
    )
  ).toThrowError("Comment not found");
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
    entries: {
      comments: {
        [commentId]: commentToSubmit,
      },
      blocks: {},
    },
    session: { id: sessionId, private: false },
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
