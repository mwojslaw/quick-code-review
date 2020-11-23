import { RootState } from "@qcr/infra/RootState";

export const getSession = (rootState: RootState) => rootState.session;
