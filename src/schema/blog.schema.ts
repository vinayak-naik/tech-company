import { object, string, number } from "yup";

const payload = {
  body: object({
    title: string().required("Name is required"),
    tag: string().required("Tag is required"),
      imageUrl: string().required("imageUrl is required"),
      description: string().required("Description is required"),
  }),
};

const params = {
  params: object({
    blogId: string().required("blogId is required"),
  }),
};

export const createBlogSchema = object({
  ...payload,
});

export const updateBlogSchema = object({
  ...params,
  ...payload,
});

export const deleteBlogSchema = object({
  ...params,
});