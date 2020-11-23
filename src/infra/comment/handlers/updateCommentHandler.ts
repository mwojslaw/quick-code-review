import { updateComment } from "@qcr/domain/Comment";
import { State } from "@qcr/infra/comment/State";
import { UpdateCommentAction } from "@qcr/infra/comment/actions";
import { ActionHandler } from "@qcr/infra/ActionHandler";
import { getComments } from "@qcr/infra/comment/selectors";

export const updateCommentHandler: ActionHandler<UpdateCommentAction, State> = (
  rootState
) => (action) => {
  const comments = getComments(rootState);

  const comment = comments[action.payload.id];

  if (!comment) throw new Error("Comment not found");

  return {
    ...comments,
    [comment.id]: updateComment({ comment, message: action.payload.message }),
  };
};
