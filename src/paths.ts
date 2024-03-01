const paths = {
  home: () => "/",

  topicShow: (slug: string) => `/topics/${slug}`,

  postCreate: (slug: string) => `/topics/${slug}/posts/new`,

  postShow: (slug: string, postId: string) => `/topics/${slug}/posts/${postId}`,

  search: (term: string) => `/search?search=${term}`,
};

export default paths;
