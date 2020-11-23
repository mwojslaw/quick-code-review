import { RootState } from "@qcr/infra/RootState";
import { Id } from "@qcr/domain/Identity";

export const getBlocks = (rootState: RootState) => rootState.entries.blocks;

export const getBlockById = (rootState: RootState, id: Id) =>
  getBlocks(rootState)[id];
