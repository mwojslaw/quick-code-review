import { Id } from "./Identity";

export type Block = {
  id: Id;
  content: string;
  sessionId: string;
};

export type CreateBlockPayload = Block;

export const createBlock = ({
  id,
  content,
  sessionId,
}: CreateBlockPayload): Block => ({
  id,
  content,
  sessionId,
});

export type UpdateBlockContentPayload = {
  block: Block;
  content: string;
};

export const updateBlockContent = ({
  block,
  content,
}: UpdateBlockContentPayload) => ({
  ...block,
  content,
});
