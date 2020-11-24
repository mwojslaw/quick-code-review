import { rootReducer, RootState } from "@qcr/infra/rootState";
import { createSessionAction } from "@qcr/infra/session";
import { createBlockAction } from "@qcr/infra/block";
import { createCommentAction } from "@qcr/infra/comment";
import { generate, createComment, createBlock } from "@qcr/domain";

const sessionId = generate();
const rootState = rootReducer(
  undefined,
  createSessionAction({
    id: sessionId,
  })
);

it("should add multiple comments to block", () => {
  const blockId = generate();
  const commentsIds = [generate(), generate()];

  const actions = [
    createBlockAction({
      id: blockId,
      content: "",
    }),
    createCommentAction({
      id: commentsIds[0],
      blockId,
      line: 1,
    }),
    createCommentAction({
      id: commentsIds[1],
      blockId,
      line: 2,
    }),
  ];

  const state = actions.reduce(rootReducer, rootState);

  const expectedState: RootState = {
    ...rootState,
    entries: {
      blocks: {
        [blockId]: createBlock({
          content: "",
          id: blockId,
          sessionId,
        }),
      },
      comments: {
        [commentsIds[0]]: createComment({
          id: commentsIds[0],
          blockId,
          sessionId,
          line: 1,
        }),
        [commentsIds[1]]: createComment({
          id: commentsIds[1],
          blockId,
          sessionId,
          line: 2,
        }),
      },
    },
  };

  expect(state).toEqual(expectedState);
});
