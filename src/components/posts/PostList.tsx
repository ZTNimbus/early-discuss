import Link from "next/link";
import paths from "@/paths";
import { PostWithData } from "@/db/queries/posts";

interface PostListProps {
  fetchData: () => Promise<PostWithData[]>;
}

async function PostList({ fetchData }: PostListProps) {
  const posts = await fetchData();

  return (
    <div className="space-y-2">
      {posts.map((post) => {
        const topicSlug = post.topic.slug;

        if (!topicSlug) {
          throw new Error("Need a slug to link to a post");
        }

        return (
          <div key={post.id} className="border border-black rounded p-2">
            <Link
              href={paths.postShow(topicSlug, post.id)}
              className="flex justify-between items-center"
            >
              <div className="flex flex-col gap-1">
                <h3 className="text-lg font-bold">{post.title}</h3>
                <div className="flex flex-row gap-5">
                  <p className="text-xs text-gray-400">By {post.user.name}</p>
                  <p className="text-xs text-gray-400">
                    {post._count.comments} comments
                  </p>
                </div>
              </div>
              <p className="text-gray-400 text-xs p-1">{post.topic.slug}</p>
            </Link>
          </div>
        );
      })}
    </div>
  );
}

export default PostList;
