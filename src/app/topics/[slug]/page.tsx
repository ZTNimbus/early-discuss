import PostCreateForm from "@/components/PostCreateForm";
import PostList from "@/components/posts/PostList";
import { fetchPostsByTopicSlug } from "@/db/queries/posts";

interface TopicsShowProps {
  params: {
    slug: string;
  };
}

function TopicsShow({ params: { slug } }: TopicsShowProps) {
  return (
    <div className="grid grid-cols-4 gap-4 p-4">
      <div className="col-span-3">
        <h1 className="text-2xl font-bold mb-2">{slug}</h1>
        <PostList fetchData={() => fetchPostsByTopicSlug(slug)} />
      </div>

      <div className="flex items-center">
        <PostCreateForm slug={slug} />
      </div>
    </div>
  );
}

export default TopicsShow;
