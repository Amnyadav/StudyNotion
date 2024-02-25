const cloudinary =require('cloudinary').v2;

exports.uploadImagetoCloudinary=async(file,folder,height,quality) =>{
    try {
        let options={folder:folder};
        options.resource_type='auto'
        if(height) {
            options.height=height
        }
        if(quality) {
            options.quality=quality
        }
        console.log(file.tempFilePath);
        console.log('inside clodinary')
        return await cloudinary.uploader.upload(file.tempFilePath,options);
    }catch(e) {
        return "error while uploading image to cloudinary...."
    }
}