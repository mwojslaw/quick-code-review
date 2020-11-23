import { RootState } from "@qcr/infra/RootState";

export type ActionHandler<Action, State> = (
  rootState: RootState
) => (action: Action) => State;
