const SubSection = require("../models/SubSection");
const Section = require("../models/Section");
const { uploadImagetoCloudinary } = require("../utils/imageUploader");
require("dotenv").config();
// const cloudinary = require("cloudinary").v2;
exports.createSubSection = async (req, res) => {
  try {
    const { title, description, sectionId } = req.body;
    console.log( req.files.videoFile);
    const videoFile = req.files.videoFile;
    if (!title || !description || !sectionId || !videoFile) {
      return res.status(404).json({
        success: false,
        message: "all fields are required",
      });
    }
    //video upload to cloudinary
    const uploadVideo = await uploadImagetoCloudinary(
      videoFile,
      process.env.FOLDER_NAME
    );
    console.log("video url is", uploadVideo.secure_url);
    // create SubSection
    const newSubSection = await SubSection.create({
      title,
      description,
      videoUrl: uploadVideo.secure_url,
    });
    // update Section
    const updateSection = await Section.findByIdAndUpdate(
      sectionId,
      {
        $push: { subSection: newSubSection._id },
      },
      { new: true }
    ).populate("subSection");
    return res.status(200).json({
      success: true,
      message: "Subsection created succesfully..",
      data: newSubSection,
      updatedSection: updateSection,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      success: false,
      message: "error while creating new subSection",
    });
  }
};

exports.updateSubSection = async (req, res) => {
  try {
    // fetch data
    const { title, description, sectionId, subSectionId } =
      req.body;
    // validation
    const videoFile = req.files.videoFile;
    if (!title || !description || !sectionId || !videoFile) {
      return res.status(404).json({
        success: false,
        message: "all fields are required",
      });
    }
    const uploadVideo = await uploadImagetoCloudinary(
      videoFile.tempFilePath,
      process.env.VIDEO_FOLDER
    );
    //update
    const updateSubSection = await SubSection.findByIdAndUpdate({_id:subSectionId}, {
      title,
      description,
      videoUrl: uploadVideo.secure_url,
    },{new:true});
    return res.status(200).json({
      success: true,
      message: "Subsection updated succesfully",
      upadatedSection:updateSubSection
    });
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: "error while updating a section.",
    });
  }
};

exports.deleteSubSection = async (req, res) => {
  try {
    const { sectionId } = req.body;
    const { subSectionId } = req.params;
    await SubSection.findByIdAndDelete(subSectionId);
    const updateSection = await Section.findByIdAndUpdate(
      sectionId,
      { $pull: { subSection: subSectionId } },
      { new: true }
    );
    return res.status(200).json({
      success: true,
      message: "subSection deleted succesfully",
      upadatedSection: updateSection,
    });
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: "error while deleting a subSection.",
    });
  }
};
