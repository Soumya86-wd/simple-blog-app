import { Client, Databases, Storage, Query, ID } from "appwrite";
import conf from "../conf/conf";

export class Service {
  client = new Client();
  databases; // for database operations
  bucket; // for storage operations

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  // database services

  async getPostBySlug(slug) {
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
      const response = await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        queries
      );

      // appwrite return an array of documents for queries
      // the array can be accessed via response.documents
      return response.documents;
    } catch (error) {
      console.error("Appwrite Service :: getActivePosts :: ", error);
      return null;
    }
  }

  async createPost({ title, slug, content, featuredImageId, status, userId }) {
    try {
      return await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        {
          title: title,
          content: content,
          featured_image_id: featuredImageId,
          status: status,
          user_id: userId,
        }
      );
    } catch (error) {
      console.error("Appwrite Service :: createPost :: ", error);
      return null;
    }
  }

  async updatePost(slug, { title, content, featuredImageId, status }) {
    try {
      return await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        {
          title: title,
          content: content,
          featured_image_id: featuredImageId,
          status: status,
        }
      );
    } catch (error) {
      console.error("Appwrite Service :: updatePost :: ", error);
      return null;
    }
  }

  async deletePostBySlug(slug) {
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

  // storage services

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
      return null;
    }
  }
}

const service = new Service();
export default service;
