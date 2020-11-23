import { updateBlockContent } from "@qcr/domain";
import { UpdateBlockContentAction } from "@qcr/infra/block/actions";
import { State } from "@qcr/infra/block/state";
import { ActionHandler } from "@qcr/infra/ActionHandler";
import { getBlocks } from "@qcr/infra/block/selectors";

export const updateBlockContentHandler: ActionHandler<
  UpdateBlockContentAction,
  State
> = (rootState) => (action) => {
  const { content, block } = action.payload;

  return {
    ...getBlocks(rootState),
    [block.id]: updateBlockContent({
      block,
      content,
    }),
  };
};
