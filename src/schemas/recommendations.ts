import mongoose, { InferSchemaType, Schema, model } from "mongoose";

export interface Recommendation {
  added_by: string;
  name: string;
  type: string;
  user: string;
  warnings: Array<string>;
}

let recoSchema = new Schema({
  added_by: { type: String, required: true },
  name: { type: String, required: true },
  type: { type: String, required: true },
  user: { type: String, required: true },
  warnings: { type: Array<String>, required: true },
});

const Reco = model("reco", recoSchema);
export default Reco;
