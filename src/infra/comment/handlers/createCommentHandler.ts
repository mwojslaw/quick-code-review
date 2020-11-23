import { createComment, isAtLine } from "@qcr/domain/Comment";
import { CreateCommentAction } from "@qcr/infra/comment/actions";
import { State } from "@qcr/infra/comment/state";
import { ActionHandler } from "@qcr/infra/ActionHandler";
import { getBlockById } from "@qcr/infra/block/selectors";
import { getComments } from "@qcr/infra/comment/selectors";
import { getSession } from "@qcr/infra/session/selectors";

export const createCommentHandler: ActionHandler<CreateCommentAction, State> = (
  rootState
) => (action) => {
  const { line, blockId, id } = action.payload;

  const session = getSession(rootState);

  if (!session) throw new Error("Session missing");

  const block = getBlockById(rootState, blockId);

  if (!block) throw new Error("Block not exists");

  const comments = getComments(rootState);

  const allComments = Object.values(comments);
  const commentAtLineAlreadyExists = allComments.find(isAtLine(line));

  if (commentAtLineAlreadyExists)
    throw new Error("Comment at this line already exists");

  const comment = createComment({ id, line, blockId, sessionId: session.id });

  return {
    ...comments,
    [comment.id]: comment,
  };
};