import { Client, Databases, Storage, Query, ID } from "appwrite";
import conf from "../conf/conf";

export class Service {
  client = new Client();
  databases;
  bucket;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.databases = new Databases(client);
    this.bucket = new Storage(client);
  }

  async getPost(slug) {
    try {
      return await this.databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );
    } catch (error) {
      console.error("Appwrite Service :: getPost :: ", error);
      return null;
    }
  }

  async getActivePosts(queries = [Query.equal("status", ["active"])]) {
    try {
      return await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        queries
      );
    } catch (error) {
      console.error("Appwrite Service :: getActivePosts :: ", error);
      return null;
    }
  }

  async createPost({ title, slug, content, featuredImage, status, userId }) {
    try {
      return await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        {
          title: title,
          content: content,
          featured_image: featuredImage,
          status: status,
          user_id: userId,
        }
      );
    } catch (error) {
      console.error("Appwrite Service :: createPost :: ", error);
      return null;
    }
  }

  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
      return await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        {
          title: title,
          content: content,
          featured_image: featuredImage,
          status: status,
        }
      );
    } catch (error) {
      console.error("Appwrite Service :: updatePost :: ", error);
      return null;
    }
  }

  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );
      return true;
    } catch (error) {
      console.error("Appwrite Service :: deletePost :: ", error);
      return false;
    }
  }

  // storage service

  async uploadFile(file) {
    try {
      return await this.bucket.createFile(
        conf.appwriteBucketId,
        ID.unique(),
        file
      );
    } catch (error) {
      console.error("Appwrite Service :: uploadFile :: ", error);
      return null;
    }
  }

  async deleteFile(fileId) {
    try {
      await this.bucket.deleteFile(conf.appwriteBucketId, fileId);
      return true;
    } catch (error) {
      console.error("Appwrite Service :: deleteFile :: ", error);
      return false;
    }
  }

  getFilePreview(fileId) {
    try {
      const result = this.bucket.getFilePreview(conf.appwriteBucketId, fileId);
      return result.href;
    } catch (error) {
      console.error("Appwrite Service :: getFilePreview :: ", error);
      return false;
    }
  }
}

const service = new Service();
export default service;
