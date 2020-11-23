import { Session } from "@qcr/domain/Session";

export type CreateSessionAction = {
  type: "CREATE_SESSION";
  payload: Session;
};

export const createSessionAction = (payload: Session): CreateSessionAction => ({
  type: "CREATE_SESSION",
  payload,
});
