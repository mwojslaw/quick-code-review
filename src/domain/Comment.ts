import { Id } from "@qcr/domain/Identity";

export type Comment = {
  id: Id;
  blockId: Id;
  sessionId: Id;
  message?: string;
  line: number;
  submited: boolean;
  isOpen: boolean;
  resolved: boolean;
};

export type CreateCommentPayload = Pick<
  Comment,
  "line" | "blockId" | "id" | "sessionId"
>;

export const createComment = ({
  id,
  line,
  blockId,
  sessionId,
}: CreateCommentPayload): Comment => ({
  id,
  sessionId,
  isOpen: true,
  submited: false,
  line,
  blockId,
  message: "",
  resolved: false,
});

export const submitComment = (comment: Comment): Comment => {
  if (comment.submited) throw new Error("Comment already submited!");

  return {
    ...comment,
    submited: true,
    isOpen: false,
  };
};

export type UpdateCommentPayload = {
  comment: Comment;
  message: string;
};

export const updateComment = ({ comment, message }: UpdateCommentPayload) => ({
  ...comment,
  message,
});

export const resolveComment = (comment: Comment): Comment => ({
  ...comment,
  resolved: true,
});

export const isAtLine = (line: number) => (comment: Comment) =>
  comment.line === line;

export const isInBlock = (blockId: Id) => (comment: Comment) =>
  comment.blockId === blockId;
