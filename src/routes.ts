import { Application, Request, Response } from "express";
import { createUserHandler } from "./controller/user.controller";
import { validateRequest, requiresUser } from "./middleware";
import {
  createUserSchema,
  createUserSessionSchema,
} from "./schema/user.schema";
import {
  createUserSessionHandler,
  invalidateUserSessionHandler,
  getUserSessionsHandler,
} from "./controller/session.controller";
import {
  createMessageSchema,
  updateMessageSchema,
  deleteMessageSchema,
} from "./schema/message.schema";
import {
  createBlogSchema,
  updateBlogSchema,
  deleteBlogSchema,
} from "./schema/blog.schema";
import {
  createMessageHandler,
  updateMessageHandler,
  getMessageHandler,
  deleteMessageHandler,
  getAllMessageHandler
} from "./controller/message.controller";
import {
  createBlogHandler,
  updateBlogHandler,
  getBlogHandler,
  deleteBlogHandler,
  getAllBlogHandler
} from "./controller/blog.controller";
import multer from "multer";

export default function (app: Application) {

  const upload = multer({ dest: "uploads/" });

  // <==========>HEALTH CHECK<==========>

  app.get("/healthcheck", (req: Request, res: Response) => res.sendStatus(200).send('Server is Running'));
  
  // <==========>USER ROUTES<==========>

  // Register user
  app.post("/api/users", validateRequest(createUserSchema), createUserHandler);

  // Login
  app.post(
    "/api/sessions",
    validateRequest(createUserSessionSchema),
    createUserSessionHandler
  );

  // Get the user's sessions
  app.get("/api/sessions", requiresUser, getUserSessionsHandler);

  // Logout
  app.delete("/api/sessions", requiresUser, invalidateUserSessionHandler);

  // <==========>MESSAGE ROUTES<==========>

  // Create a post
  app.post(
    "/api/message",
    [validateRequest(createMessageSchema)],
    createMessageHandler
  );

    // Update a message
    app.put(
      "/api/message/:messageId",
      [validateRequest(updateMessageSchema)],
      updateMessageHandler
    );
  
    // Get a message
    app.get("/api/message/:messageId",requiresUser, getMessageHandler);

    // Get all messages
    app.get("/api/messages",getAllMessageHandler);
  
    // Delete a message
    app.delete(
      "/api/message/:messageId",
      [requiresUser, validateRequest(deleteMessageSchema)],
      deleteMessageHandler
    );

      // <==========>BLOG ROUTES<==========>

      // Create a blog
      app.post(
        "/api/blog",
        [validateRequest(createBlogSchema)],
        upload.single("file"),
        createBlogHandler
      );
    
        // Update a blog
        app.put(
          "/api/blog/:blogId",
          [validateRequest(updateBlogSchema)],
          updateBlogHandler
        );
      
        // Get a blog
        app.get("/api/blog/:blogId",getBlogHandler);
    
        // Get all blogs
        app.get("/api/blogs",getAllBlogHandler);
      
        // Delete a blog
        app.delete(
          "/api/blog/:blogId",
          [requiresUser, validateRequest(deleteBlogSchema)],
          deleteBlogHandler
        );
}
