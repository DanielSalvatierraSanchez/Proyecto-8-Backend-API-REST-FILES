import { deleteFile } from "./deleteFile"

const deleteImageUploaded = (files) => {
    deleteFile(files.firstImg[0].path) ||
    deleteFile(files.secondImg[0].path) ||
    deleteFile(files.thirdImg[0].path);
};

module.exports = { deleteImageUploaded };