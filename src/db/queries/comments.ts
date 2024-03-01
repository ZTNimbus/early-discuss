import { Comment } from "@prisma/client";
import db from "..";
import { cache } from "react";

type CommentWithAuthor = Comment & {
  user: { name: string | null; image: string | null };
};

const fetchCommentsByPostId = cache(
  (postId: string): Promise<CommentWithAuthor[]> => {
    return db.comment.findMany({
      where: {
        postId,
      },

      include: {
        user: {
          select: {
            name: true,
            image: true,
          },
        },
      },
    });
  }
);

export { type CommentWithAuthor, fetchCommentsByPostId };
