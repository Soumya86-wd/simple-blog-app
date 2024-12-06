import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";

import { service as appwriteService } from "../appwrite";
import { Container, PostForm } from "../components";

function EditPost() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(async () => {
    if (slug) {
      const retrievedPost = await appwriteService.getPostBySlug(slug);
      if (retrievedPost) {
        setPost(retrievedPost);
      } else {
        navigate("/");
      }
    }
  }, [slug, navigate]);

  return (
    <div className="py-6">
      <Container>
        <PostForm post={post} />
      </Container>
    </div>
  );
}

export default EditPost;
