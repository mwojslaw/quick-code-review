import { Comment, Id } from "@qcr/domain";
import {
  createCommentHandler,
  updateCommentHandler,
  submitCommentHandler,
} from "@qcr/infra/comment/handlers";
import { CommentActions } from "@qcr/infra/comment/actions";
import { createReducerSlice } from "@qcr/infra/createReducerSlice";

export type CommentsState = Record<Id, Comment>;

const handlersPerActionType = {
  CREATE_COMMENT: createCommentHandler,
  UPDATE_COMMENT: updateCommentHandler,
  SUBMIT_COMMENT: submitCommentHandler,
};

export const commentsReducer = createReducerSlice<
  CommentActions,
  CommentsState
>(handlersPerActionType, (rootState) => rootState.entries.comments || {});
