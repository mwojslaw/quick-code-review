import { updateComment } from "@qcr/domain/Comment";
import { CommentsState } from "@qcr/infra/comment/state";
import { UpdateCommentAction } from "@qcr/infra/comment/actions";
import { ActionHandler } from "@qcr/infra/ActionHandler";
import { getComments } from "@qcr/infra/comment/selectors";

export const updateCommentHandler: ActionHandler<
  UpdateCommentAction,
  CommentsState
> = (rootState) => (action) => {
  const comments = getComments(rootState);

  const comment = comments[action.payload.id];

  if (!comment) throw new Error("Comment not found");

  return {
    ...comments,
    [comment.id]: updateComment({ comment, message: action.payload.message }),
  };
};
