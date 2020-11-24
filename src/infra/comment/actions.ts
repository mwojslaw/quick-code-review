import { CreateCommentPayload } from "@qcr/domain/Comment";
import { UpdateCommentPayload, Id } from "@qcr/domain";

type CreateCommentActionPayload = Omit<CreateCommentPayload, "sessionId">;

export type CreateCommentAction = {
  type: "CREATE_COMMENT";
  payload: CreateCommentActionPayload;
};

export const createCommentAction = (
  payload: CreateCommentActionPayload
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

export type UpdateCommentActionPayload = { id: Id; message: string };

export type UpdateCommentAction = {
  type: "UPDATE_COMMENT";
  payload: UpdateCommentActionPayload;
};

export const updateCommentAction = (
  payload: UpdateCommentActionPayload
): UpdateCommentAction => ({
  type: "UPDATE_COMMENT",
  payload,
});

export type CommentActions =
  | UpdateCommentAction
  | SubmitCommentAction
  | CreateCommentAction;
