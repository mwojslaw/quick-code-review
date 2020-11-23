import {
  State as CommentsState,
  reducer as commentsReducer,
} from "@qcr/infra/comment";
import {
  State as BlocksState,
  reducer as blocksReducer,
} from "@qcr/infra/block";
import {
  State as SessionState,
  reducer as sessionReducer,
} from "@qcr/infra/session";

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
