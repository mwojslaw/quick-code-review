import { CommentsState, commentsReducer } from "@qcr/infra/comment/state";
import { BlocksState, blocksReducer } from "@qcr/infra/block/state";
import { SessionState, sessionReducer } from "@qcr/infra/session/state";

export type RootState = {
  session: SessionState;
  entries: {
    comments: CommentsState;
    blocks: BlocksState;
  };
};

export const rootReducer = (rootState: RootState, action): RootState => ({
  session: sessionReducer(rootState, action),
  entries: {
    comments: commentsReducer(rootState, action),
    blocks: blocksReducer(rootState, action),
  },
});
