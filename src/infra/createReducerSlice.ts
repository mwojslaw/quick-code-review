import { RootState } from "@qcr/infra/RootState";

export const createReducerSlice = <State>(
  actonHandlersPerActionType: Record<
    string,
    (rootState: RootState) => (action) => State
  >,
  initialState: State
) => (rootState: RootState, action): State => {
  const actionHandlerFactory = actonHandlersPerActionType[action.type];

  if (!actionHandlerFactory) return initialState;

  const actionHandler = actionHandlerFactory(rootState);

  return actionHandler(action);
};
