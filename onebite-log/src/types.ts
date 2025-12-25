import { type Database } from "./database.types";

export type PostEntity = Database["public"]["Tables"]["post"]["Row"];
export type ProfileEntity = Database["public"]["Tables"]["profile"]["Row"];

export type Post = PostEntity & { author: ProfileEntity; isLiked: boolean };

export type useMutationCallback = {
  onMutate?: () => void;
  onSettled?: () => void;
  onSuccess?: () => void;
  onError?: (error: Error) => void;
};
