import { v2 as cloudinary } from "cloudinary";
import songModel from "../models/songModel.js";

const addSong = async (req, res) => {
  try {
    const { name, desc, album } = req.body;

    // Ensure files are present before accessing them
    if (!req.files || !req.files.audio || !req.files.image) {
      return res
        .status(400)
        .json({ message: "Audio and image files are required." });
    }

    const audioFile = req.files.audio[0];
    const imageFile = req.files.image[0];

    // Upload audio file to Cloudinary
    const audioUpload = await cloudinary.uploader.upload(audioFile.path, {
      resource_type: "video", // Use "video" for audio uploads in Cloudinary
    });

    // Calculate duration after uploading
    const duration = `${Math.floor(audioUpload.duration / 60)}:${Math.floor(
      audioUpload.duration % 60
    )}`;

    // Upload image file to Cloudinary
    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
      resource_type: "image",
    });

    const songData = {
      name,
      desc,
      album,
      file: audioUpload.secure_url, // Use the secure URL from Cloudinary
      image: imageUpload.secure_url, // Use the secure URL from Cloudinary
      duration,
    };

    // Save song data to your database model
    const newSong = new songModel(songData);
    await newSong.save(); // Save the song to the database

    // Respond with success
    return res
      .status(201)
      .json({ message: "Song added successfully!", song: newSong });
  } catch (error) {
    console.error("Error adding song:", error);
    return res
      .status(500)
      .json({ message: "An error occurred while adding the song." });
  }
};

const listSong = async (req, res) => {
  // Implementation for listing songs
  try {
    const allSongs = await songModel.find({});
    res.json({ success: true, songs: allSongs });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

const removeSong = async (req, res) => {
  const { id } = req.body; // Extract the song ID from the request body

  try {
    // Find and delete the song by ID
    const deletedSong = await songModel.findByIdAndDelete(id);

    if (!deletedSong) {
      return res.status(404).json({
        success: false,
        message: "Song not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Song deleted successfully!",
    });
  } catch (error) {
    console.error("Error deleting song:", error);
    res.status(500).json({
      success: false,
      message: "There was an error deleting the song",
    });
  }
};
export { addSong, listSong, removeSong };
