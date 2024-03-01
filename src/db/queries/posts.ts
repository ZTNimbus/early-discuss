import type { Post } from "@prisma/client";
import db from "..";

type PostWithData = Post & {
  topic: { slug: string };
  user: { name: string | null };
  _count: { comments: number };
};

function fetchPostsByTopicSlug(slug: string): Promise<PostWithData[]> {
  return db.post.findMany({
    where: {
      topic: { slug },
    },
    include: {
      user: { select: { name: true } },
      topic: { select: { slug: true } },
      _count: { select: { comments: true } },
    },
  });
}

function fetchTopPosts(): Promise<PostWithData[]> {
  return db.post.findMany({
    orderBy: [
      {
        comments: {
          _count: "desc",
        },
      },
    ],

    include: {
      topic: { select: { slug: true } },
      user: { select: { name: true, image: true } },
      _count: { select: { comments: true } },
    },

    take: 5,
  });
}

function fetchSearchedPosts(searchTerm: string): Promise<PostWithData[]> {
  return db.post.findMany({
    where: {
      OR: [
        { title: { contains: searchTerm } },
        { content: { contains: searchTerm } },
      ],
    },
    include: {
      user: { select: { name: true, image: true } },
      topic: { select: { slug: true } },
      _count: { select: { comments: true } },
    },
  });
}

export {
  type PostWithData,
  fetchPostsByTopicSlug,
  fetchTopPosts,
  fetchSearchedPosts,
};
