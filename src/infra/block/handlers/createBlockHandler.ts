import { createBlock } from "@qcr/domain";
import { CreateBlockAction } from "@qcr/infra/block/actions";
import { BlocksState } from "@qcr/infra/block/state";
import { ActionHandler } from "@qcr/infra/ActionHandler";
import { getBlocks } from "@qcr/infra/block/selectors";
import { getSession } from "@qcr/infra/session/selectors";

export const createBlockHandler: ActionHandler<
  CreateBlockAction,
  BlocksState
> = (rootState) => (action) => {
  const { id, content } = action.payload;

  const session = getSession(rootState);

  if (!session) throw new Error("Session missing");

  const blocks = getBlocks(rootState);

  const block = createBlock({
    id,
    content,
    sessionId: session.id,
  });

  return {
    ...blocks,
    [block.id]: block,
  };
};
