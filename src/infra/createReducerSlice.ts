import { RootState } from "@qcr/infra/RootState";

type Action = {
  type: string;
};

export const createReducerSlice = <Actions extends Action, State>(
  actonHandlersPerActionType: Record<
    Actions["type"],
    (rootState: RootState) => (action: Actions) => State
  >,
  initialState: State
) => (rootState: RootState, action: Actions): State => {
  const actionHandlerFactory = actonHandlersPerActionType[action.type];

  if (!actionHandlerFactory) return initialState;

  const actionHandler = actionHandlerFactory(rootState);

  return actionHandler(action);
};
