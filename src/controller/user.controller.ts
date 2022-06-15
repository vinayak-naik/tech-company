import { Request, Response } from "express";
import { omit } from "lodash";
import { createUser, findUser } from "../service/user.service";
import log from "../logger";

export async function createUserHandler(req: Request, res: Response) {
  try {

    const existingUser = await findUser({email:req.body.email});
    if (existingUser) {
      return res.status(409).send('Email Already Exists');
    } else {
      const user = await createUser(req.body);
      return res.send(omit(user.toJSON(), "password"));
    }
  } catch (e:any) {
    log.error(e);
    return res.status(409).send(e.message);
  }
}
