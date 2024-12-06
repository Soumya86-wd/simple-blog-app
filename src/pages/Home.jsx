import React, { useEffect, useState } from "react";
import { service as appwriteService } from "../appwrite";

import { PostCard, Container } from "../components";

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const retrievedPosts = await appwriteService.getActivePosts();
        console.log("Retrieved Posts: ", retrievedPosts);

        if (retrievedPosts) {
          setPosts(retrievedPosts);
        }
      } catch (error) {
        console.error("Error retrieving posts: ", error);
      }
    };

    fetchPosts();
  }, []);

  if (posts.length === 0) {
    return (
      <div className="w-full py-8">
        <Container>
          <div className="flex flex-wrap">
            <h1>No Posts yet. Login to create!</h1>
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

export default Home;
