const cloudinary = require('cloudinary').v2;

const deleteFile = (imgUrl) => {
    const imgSplited = imgUrl.split('/');
    const folderName = imgSplited.at(-2);
    const imgName = imgSplited.at(-1).split('.');
    let publicID = `${folderName}/${imgName[0]}`;

    cloudinary.uploader.destroy(publicID);
}

const deleteImageUploaded = (files) => {
    deleteFile(files.firstImg[0].path) ||
    deleteFile(files.secondImg[0].path) ||
    deleteFile(files.thirdImg[0].path);
};

module.exports = { deleteFile, deleteImageUploaded };