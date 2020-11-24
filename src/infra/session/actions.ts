import { CreateSessionPayload } from "@qcr/domain/Session";

export type CreateSessionAction = {
  type: "CREATE_SESSION";
  payload: CreateSessionPayload;
};

export const createSessionAction = (
  payload: CreateSessionPayload
): CreateSessionAction => ({
  type: "CREATE_SESSION",
  payload,
});

export type SessionActions = CreateSessionAction;
