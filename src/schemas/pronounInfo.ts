import mongoose, { InferSchemaType, Schema, model } from "mongoose";

let pronounSchema = new Schema({
  userId: { type: String, required: true },
  pronouns: Array<String>,
  accords: Array<String>,
  page: String,
});

type Pronouns = InferSchemaType<typeof pronounSchema>;

export default model<Pronouns>("pronouns", pronounSchema);
