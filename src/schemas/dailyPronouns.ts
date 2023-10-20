import mongoose, { InferSchemaType, Schema, model } from "mongoose";

let dailyPronounSchema = new Schema({
  userId: { type: String, required: true },
  pronom: String,
  accord: String,
});

type DailyPronouns = InferSchemaType<typeof dailyPronounSchema>;

export default model<DailyPronouns>("daily", dailyPronounSchema);
