import React, { useEffect, useState } from "react";
import { service as appwriteService } from "../appwrite";

import { PostCard, Container } from "../components";

function AllPosts() {
  const [posts, setPosts] = useState([]);
  useEffect(async () => {
    const retrievedPosts = await appwriteService.getActivePosts();
    if (retrievedPosts) {
      setPosts(retrievedPosts);
    }
  }, []);

  if (posts.length === 0) {
    return (
      <div className="w-full py-8">
        <Container>
          <div className="flex flex-wrap">
            <h1>Create a new post</h1>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap">
          {posts.map((post) => (
            <div className="p-2 w-1/4" key={post.$id}>
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default AllPosts;
