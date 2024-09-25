import mongoose from "mongoose";

const songSchema = new mongoose.Schema({
  name: { type: String, required: true },
  desc: { type: String, required: true },
  album: { type: String, required: true },
  image: { type: String, required: false },
  file: { type: String, required: false },
  duration: { type: String, required: false },
});

const songModel = mongoose.models.song || mongoose.model("song", songSchema);

export default songModel;
