import {
  DocumentDefinition,
  FilterQuery,
  UpdateQuery,
  QueryOptions,
} from "mongoose";
import Message, { MessageDocument } from "../model/message.model";

export function createMessage(input: DocumentDefinition<MessageDocument>) {
  return Message.create(input);
}

export function findMessage(
  query: FilterQuery<MessageDocument>,
  options: QueryOptions = { lean: true }
) {
  return Message.findOne(query, {}, options);
}
export function findAllMessages() {
  return Message.find({});
}

export function findAndUpdate(
  query: FilterQuery<MessageDocument>,
  update: UpdateQuery<MessageDocument>,
  options: QueryOptions
) {
  return Message.findOneAndUpdate(query, update, options);
}

export function deleteMessage(query: FilterQuery<MessageDocument>) {
  return Message.deleteOne(query);
}
