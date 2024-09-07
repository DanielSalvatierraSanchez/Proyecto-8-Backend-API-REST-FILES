const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "Proyecto8ApiRestFile",
        allowedFormats: ['jpg', 'png', 'jpeg', 'gif', 'webp', 'avif'],
    }
});

const upload = multer({ storage });

//! Estuve probando el codigo de abajo pero no se me exportaba, si podeis me gustaria verlo detenidamente o donde puedo ver ejemplos
//! ya que me parece muy interesante separar imagenes por carpetas, el orden es una de mis TOC mas preciados jajajajajaja
// const foldersOfStorage = (folderName) => {
//     return new CloudinaryStorage({
//         cloudinary: cloudinary,
//         params: {
//             folder: folderName,
//             allowedFormats: ['jpg', 'png', 'jpeg', 'gif', 'webp', 'avif'],
//         }
//     });
// };

// const uploadFolders = (folderName) => {
//     const storage = foldersOfStorage(folderName);
//     return multer({ storage });
// };
// module.exports = uploadFolders;

module.exports = upload;