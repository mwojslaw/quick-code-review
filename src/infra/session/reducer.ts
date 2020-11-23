import { createSessionHandler } from "@qcr/infra/session/handlers";
import { createReducerSlice } from "@qcr/infra/createReducerSlice";

export const reducer = createReducerSlice(
  {
    CREATE_SESSION: createSessionHandler,
  },
  null
);
