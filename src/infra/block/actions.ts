import { CreateBlockPayload } from "@qcr/domain/Block";
import { UpdateBlockContentPayload } from "@qcr/domain/Block";

type CreateBlockActionPayload = Omit<CreateBlockPayload, "sessionId">;

export type CreateBlockAction = {
  type: "CREATE_BLOCK";
  payload: CreateBlockActionPayload;
};

export type UpdateBlockContentAction = {
  type: "UPDATE_BLOCK_CONTENT";
  payload: UpdateBlockContentPayload;
};

export type BlockActions = CreateBlockAction | UpdateBlockContentAction;

export const createBlockAction = (
  payload: CreateBlockActionPayload
): CreateBlockAction => ({
  type: "CREATE_BLOCK",
  payload,
});
