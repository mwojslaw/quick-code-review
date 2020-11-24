import { CreateBlockPayload } from "@qcr/domain/Block";
import { UpdateBlockContentPayload } from "@qcr/domain/Block";

export type CreateBlockAction = {
  type: "CREATE_BLOCK";
  payload: CreateBlockPayload;
};

export type UpdateBlockContentAction = {
  type: "UPDATE_BLOCK_CONTENT";
  payload: UpdateBlockContentPayload;
};

export type BlockActions = CreateBlockAction | UpdateBlockContentAction;
