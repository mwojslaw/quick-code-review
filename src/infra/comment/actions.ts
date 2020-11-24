import { CreateCommentPayload } from "@qcr/domain/Comment";
import { UpdateCommentPayload, Id } from "@qcr/domain";

export type CreateCommentAction = {
  type: "CREATE_COMMENT";
  payload: CreateCommentPayload;
};

export const createCommentAction = (
  payload: CreateCommentPayload
): CreateCommentAction => ({
  type: "CREATE_COMMENT",
  payload,
});

export type SubmitCommentActionPayload = {
  id: Id;
};

export type SubmitCommentAction = {
  type: "SUBMIT_COMMENT";
  payload: SubmitCommentActionPayload;
};

export const submitCommentAction = (
  payload: SubmitCommentActionPayload
): SubmitCommentAction => ({
  type: "SUBMIT_COMMENT",
  payload,
});

export type UpdateCommentActionPayload = UpdateCommentPayload & { id: Id };

export type UpdateCommentAction = {
  type: "UPDATE_COMMENT";
  payload: UpdateCommentActionPayload;
};

export type CommentActions =
  | UpdateCommentAction
  | SubmitCommentAction
  | CreateCommentAction;
