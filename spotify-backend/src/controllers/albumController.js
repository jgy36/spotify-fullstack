import { v2 as cloudinary } from "cloudinary";
import albumModel from "../models/albumModel.js";

const addAlbum = async (req, res) => {
  try {
    const name = req.body.name;
    const desc = req.body.desc;
    const bgcolor = req.body.bgcolor;
    const imageFile = req.file;
    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
      resource_type: "image",
    });
    const albumData = {
      name,
      desc,
      bgcolor,
      image: imageUpload.secure_url,
    };

    const album = albumModel(albumData);
    await album.save();

    res.json({ success: true, message: "Album added successfully", album });
  } catch (error) {
    res.json({
      success: false,
      message: "An error occurred while adding the album",
    });
  }
};

const listAlbum = async (req, res) => {
  try {
    const allAlbums = await albumModel.find();
    res.json({ success: true, albums: allAlbums });
  } catch (error) {
    res.json({
      success: false,
      message: "An error occurred while fetching albums",
    });
  }
};

const removeAlbum = async (req, res) => {
  try {
    await albumModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Album removed successfully" });
  } catch (error) {
    res.json({
      success: false,
      message: "An error occurred while removing the album",
    });
  }
};

export { addAlbum, listAlbum, removeAlbum };
