import { Session } from "@qcr/domain/Session";
import { createSessionHandler } from "@qcr/infra/session/handlers";
import { createReducerSlice } from "@qcr/infra/createReducerSlice";
import { SessionActions } from "@qcr/infra/session/actions";

export type SessionState = Session | null;

const handlerPerActionType = {
  CREATE_SESSION: createSessionHandler,
};

const initialState = null;

export const sessionReducer = createReducerSlice<SessionActions, SessionState>(
  handlerPerActionType,
  initialState
);
