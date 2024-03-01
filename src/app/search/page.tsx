import PostList from "@/components/posts/PostList";
import { fetchSearchedPosts } from "@/db/queries/posts";
import paths from "@/paths";
import { redirect } from "next/navigation";

interface SearchPageProps {
  searchParams: {
    search: string;
  };
}

function SearchPage({ searchParams: { search } }: SearchPageProps) {
  if (!search) redirect(paths.home());

  return (
    <div className="flex flex-col gap-6">
      <h2>
        Results for: <span className="font-bold">{search}</span>
      </h2>
      <PostList fetchData={() => fetchSearchedPosts(search)} />
    </div>
  );
}

export default SearchPage;
