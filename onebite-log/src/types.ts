import { type Database } from "./database.types";

export type PostEntity = Database["public"]["Tables"]["post"]["Row"];
export type ProfileEntity = Database["public"]["Tables"]["profile"]["Row"];
export type CommentEntity = Database["public"]["Tables"]["comment"]["Row"];

export type Post = PostEntity & { author: ProfileEntity; isLiked: boolean };
export type Comment = CommentEntity & { author: ProfileEntity };
export type NestedComment = Comment & {
  parentComment?: Comment;
  children: NestedComment[];
};

export type useMutationCallback = {
  onMutate?: () => void;
  onSettled?: () => void;
  onSuccess?: () => void;
  onError?: (error: Error) => void;
};

export type Theme = "system" | "dark" | "light";
