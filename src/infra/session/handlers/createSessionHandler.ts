import { createSession } from "@qcr/domain/Session";
import { CreateSessionAction } from "@qcr/infra/session/actions";
import { State } from "@qcr/infra/session/State";
import { ActionHandler } from "@qcr/infra/ActionHandler";
import { getSession } from "@qcr/infra/session/selectors";

export const createSessionHandler: ActionHandler<CreateSessionAction, State> = (
  rootState
) => (action) => {
  const session = getSession(rootState);

  if (session) throw new Error("Session already created");

  return createSession(action.payload);
};
