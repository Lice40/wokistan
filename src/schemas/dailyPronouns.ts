import mongoose, { InferSchemaType, Schema, model } from "mongoose";

export interface Daily {
  userId: string;
  pronom: string;
  accord: string;
}

let dailyPronounSchema = new Schema({
  userId: { type: String, required: true },
  pronom: String,
  accord: String,
});

type DailyPronouns = InferSchemaType<typeof dailyPronounSchema>;

export default model<DailyPronouns>("daily", dailyPronounSchema);
