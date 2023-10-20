import mongoose, { InferSchemaType, Schema, model } from "mongoose";

let recoSchema = new Schema({
  added_by: { type: String, required: true },
  name: { type: String, required: true },
  type: { type: String, required: true },
  user: { type: String, required: true },
});

type Reco = InferSchemaType<typeof recoSchema>;

export default model<Reco>("reco", recoSchema);
