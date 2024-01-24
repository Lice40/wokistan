import mongoose, { InferSchemaType, Schema, model } from "mongoose";

export interface Poll {
  added_by: string;
  id: string;
  voters: Set<any>;
  name: string;
  ended: boolean;
}

let pollSchema = new Schema({
  added_by: { type: String, required: true },
  id: { type: String, required: true },
  voters: { type: Array<String>, required: true },
  name: { type: String, required: true },
  ended: { type: Boolean, required: true },
});

const Poll = model("poll", pollSchema);
export default Poll;
