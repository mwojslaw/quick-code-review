import { Block, Id } from "@qcr/domain";
import {
  createBlockHandler,
  updateBlockContentHandler,
} from "@qcr/infra/block/handlers";
import { createReducerSlice } from "@qcr/infra/createReducerSlice";
import { BlockActions } from "@qcr/infra/block/actions";

export type BlocksState = Record<Id, Block>;

const handlersPerActionType = {
  CREATE_BLOCK: createBlockHandler,
  UPDATE_BLOCK_CONTENT: updateBlockContentHandler,
};

export const blocksReducer = createReducerSlice<BlockActions, BlocksState>(
  handlersPerActionType,
  (rootState) => rootState.entries.blocks || {}
);
