import mongoose, { InferSchemaType, Schema, model } from "mongoose";

export interface PronounInfo {
  userId: string;
  pronouns: Array<string>;
  accords: Array<string>;
  page: string;
}

let pronounSchema = new Schema({
  userId: { type: String, required: true },
  pronouns: Array<String>,
  accords: Array<String>,
  page: String,
});

type Pronouns = InferSchemaType<typeof pronounSchema>;

export default model<Pronouns>("pronouns", pronounSchema);
