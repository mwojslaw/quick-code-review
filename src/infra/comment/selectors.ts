import { RootState } from "@qcr/infra/RootState";

export const getComments = (rootState: RootState) => rootState.entries.comments;
