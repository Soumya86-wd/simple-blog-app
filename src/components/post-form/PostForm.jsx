import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

import Button from "../Button";
import Input from "../Input";
import Select from "../Select";
import RTE from "../RTE";

import { service as appwriteService } from "../../appwrite";

const PostForm = ({ post }) => {
  const { register, handleSubmit, watch, setValue, getValues, control } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.slug || "",
        content: post?.content || "",
        status: post?.status || "active",
      },
    });

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  const submit = async (data) => {
    if (post) {
      // Update an exisiting post in appwrite
      const file = data.image[0]
        ? await appwriteService.uploadFile(data.image[0])
        : null;

      if (file) {
        await appwriteService.deleteFile(post.featuredImageId);
      }

      const dbPost = await appwriteService.updatePost(post.$id, {
        ...data,
        featuredImageId: file ? file.$id : undefined,
      });

      if (dbPost) {
        navigate(`/post/${dbPost.$id}`);
      }
    } else {
      // Create a new post in appwrite
      const file = await appwriteService.uploadFile(data.image[0]);

      if (file) {
        const fileId = file.$id;
        data.featuredImageId = fileId;

        const dbPost = await appwriteService.createPost({
          ...data,
          userId: userData.$id,
        });

        if (dbPost) {
          navigate(`/post/${dbPost.$id}`);
        }
      }
    }
  };

  const transformStringToSlug = useCallback((titleInput) => {
    if (titleInput && typeof titleInput === "string") {
      const constructedSlug = titleInput
        .toLowerCase()
        .split(" ")
        .filter(Boolean)
        .join("-");

      // Remove special characters and return
      // Read: replace everything but, (a to z), (0 to 9) and (-) by nothing, meaning remove
      return constructedSlug.replace(/[^a-z0-9-]/g, "");
    } else return "";
  }, []);

  useEffect(() => {
    watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", transformStringToSlug(value.title), {
          shouldValidate: true,
        });
      }
    });
  }, [watch, transformStringToSlug, setValue]);

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
      {/* Left Container here */}
      <div className="w-2/3 px-2">
        <Input
          label="Title"
          placeholder="Title"
          className="mb-4"
          {...register("title", { required: true })}
        />
        <Input
          label="Slug: "
          placeholder="Slug"
          className="mb-4"
          {...register("slug", { required: true })}
          onInput={(e) => {
            setValue("slug", transformStringToSlug(e.currentTarget.value), {
              shouldValidate: true,
            });
          }}
        />
        <RTE
          label="Content: "
          name="content"
          control={control}
          defaultValues={getValues("content")}
        />
      </div>
      {/* Left Container ends */}

      {/* Right Container here */}
      <div className="w-1/3 px-2">
        <Input
          label="Featured Image"
          type="file"
          className="mb-4"
          accept="image/png, image/jpg, image/jpeg"
          {...register("image", { required: !post })}
        />
        {post && (
          <div className="w-full mb-4">
            <img
              src={appwriteService.getFilePreview(post.featuredImageId)}
              alt={post.title}
              className="rounded-lg"
            />
          </div>
        )}
        <Select
          selectOptions={["active", "inactive"]}
          label="Status"
          className="mb-4"
          {...register("status", { required: true })}
        />
        <Button
          type="submit"
          bgColor={post ? "bg-green-700" : undefined}
          className="w-full"
        >
          {post ? "Update" : "Submit"}
        </Button>
      </div>
      {/* Right Container ends */}
    </form>
  );
};

export default PostForm;
