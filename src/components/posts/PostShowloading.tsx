import { Skeleton } from "@nextui-org/react";

function PostShowLoading() {
  return (
    <div className="m-4">
      <div className="my-2">
        <Skeleton className="h-8 w-96" />
      </div>

      <div className="p-4 border rounded space-y-2">
        <Skeleton className="h-6 w-72" />
        <Skeleton className="h-6 w-60" />
        <Skeleton className="h-6 w-40" />
      </div>
    </div>
  );
}

export default PostShowLoading;
