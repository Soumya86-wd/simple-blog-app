import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { useSelector } from "react-redux";
import parse from "html-react-parser";

import { service as appwriteService } from "../appwrite";
import { Button, Container } from "../components";

function Post() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  useEffect(async () => {
    if (slug) {
      const displayPost = await appwriteService.getPostBySlug(slug);
      if (post) {
        setPost(displayPost);
      } else {
        navigate("/");
      }
    }
  }, [slug, navigate]);

  const isAuthor = post && userData ? post.userId === userData.$id : false;

  const deletePost = async () => {
    const response = await appwriteService.deletePost(post.$id);
    if (response.status) {
      await appwriteService.deleteFile(post.featuredImageId);
      navigate("/");
    }
  };

  return (
    post && (
      <div className="py-8">
        <Container>
          <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
            <img
              src={appwriteService.getFilePreview(post.featuredImageId)}
              alt={post.title}
              className="rounded-xl"
            />

            {/* Only the author of a post can edit/delete the post */}
            {isAuthor && (
              <div className="absolute-right-6 top-6">
                <Link to={`/edit-post/${post.$id}`}>
                  <Button bgColor="bg-green-500" className="mr-3">
                    Edit
                  </Button>
                </Link>
                <Button bgColor="bg-red-500" onClick={deletePost}>
                  Delete
                </Button>
              </div>
            )}
          </div>

          <div className="w-full mb-6">
            <h1 className="text-2xl font-bold">{post.title}</h1>
            <div className="browser-css">{parse(post.content)}</div>
          </div>
        </Container>
      </div>
    )
  );
}

export default Post;
