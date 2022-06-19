import { object, string } from "yup";

const payload = {
  body: object({
    name: string().required("Name is required"),
    email: string()
      .email("Must be a valid email")
      .required("Email is required"),
      phone: string().required("Phone number is required"),
      service: string().required("Service is required"),
      description: string().required("Description is required"),
  }),
};

const params = {
  params: object({
    messageId: string().required("messageId is required"),
  }),
};

export const createMessageSchema = object({
  ...payload,
});

export const updateMessageSchema = object({
  ...params,
  ...payload,
});

export const deleteMessageSchema = object({
  ...params,
});
