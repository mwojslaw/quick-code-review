import { submitComment } from "@qcr/domain/Comment";
import { SubmitCommentAction } from "@qcr/infra/comment/actions";
import { State } from "@qcr/infra/comment/State";
import { ActionHandler } from "@qcr/infra/ActionHandler";
import { getComments } from "@qcr/infra/comment/selectors";

export const submitCommentHandler: ActionHandler<SubmitCommentAction, State> = (
  rootState
) => (action) => {
  const comments = getComments(rootState);

  const comment = comments[action.payload.id];

  if (!comment) throw new Error("Comment not found");

  return {
    ...comments,
    [comment.id]: submitComment(comment),
  };
};
