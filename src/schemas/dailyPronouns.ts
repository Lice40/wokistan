import mongoose, { InferSchemaType, Schema, model } from "mongoose";

export interface Daily {
  userId: string;
  pronom: Array<string>;
  accord: Array<string>;
  already_picked: Array<string>;
}

let dailyPronounSchema = new Schema({
  userId: { type: String, required: true },
  pronom: Array<String>,
  accord: Array<String>,
  already_picked: Array<string>,
});

type DailyPronouns = InferSchemaType<typeof dailyPronounSchema>;

export default model<DailyPronouns>("daily", dailyPronounSchema);
