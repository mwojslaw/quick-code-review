import {
  createBlockHandler,
  updateBlockContentHandler,
} from "@qcr/infra/block/handlers";
import { createReducerSlice } from "@qcr/infra/createReducerSlice";

export const reducer = createReducerSlice(
  {
    CREATE_BLOCK: createBlockHandler,
    UPDATE_BLOCK_CONTENT: updateBlockContentHandler,
  },
  {}
);
