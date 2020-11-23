import { Id } from "./Identity";

export type Session = {
  id: Id;
  private: boolean;
};

type CreateSessionPayload = { id: Id };

export const createSession = ({ id }: CreateSessionPayload): Session => ({
  id,
  private: false,
});
