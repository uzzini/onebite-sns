import { type Database } from "./database.types";

export type PostEntity = Database["public"]["Tables"]["post"]["Row"];
export type ProfileEntity = Database["public"]["Tables"]["profile"]["Row"];

export type useMutationCallback = {
  onMutate?: () => void;
  onSettled?: () => void;
  onSuccess?: () => void;
  onError?: (error: Error) => void;
};
