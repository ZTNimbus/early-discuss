import CommentShow from "@/components/comments/CommentShow";
import { fetchCommentsByPostId } from "@/db/queries/comments";

interface CommentListProps {
  postId: string;
}

async function CommentList({ postId }: CommentListProps) {
  const comments = await fetchCommentsByPostId(postId);

  const topLevelComments = comments.filter(
    (comment) => comment.parentId === null
  );

  return (
    <div className="space-y-3">
      <h1 className="text-lg font-bold">All {comments.length} comments</h1>
      {topLevelComments.map((comment) => {
        return (
          <CommentShow
            key={comment.id}
            commentId={comment.id}
            postId={postId}
          />
        );
      })}
    </div>
  );
}

export default CommentList;
