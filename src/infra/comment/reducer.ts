import {
  createCommentHandler,
  updateCommentHandler,
  submitCommentHandler,
} from "@qcr/infra/comment/handlers";
import { createReducerSlice } from "@qcr/infra/createReducerSlice";

export const reducer = createReducerSlice(
  {
    CREATE_COMMENT: createCommentHandler,
    UPDATE_COMMENT: updateCommentHandler,
    SUBMIT_COMMENT: submitCommentHandler,
  },
  {}
);
