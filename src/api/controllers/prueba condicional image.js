// if (req.files) {
//     if (req.files.img) {
//         newCake.img = req.files.img[0].path;
//     } else {
//         if (req.files.img2) {
//             deleteFile(req.files.img2[0].path);
//         }
//         if (req.files.img3) {
//             deleteFile(req.files.img3[0].path);
//         }
//         return res.status(400).json({ message: 'No ha sido introducida ninguna imagen.' })
//     }

//     if (req.files.img && req.files.img2) {
//             newCake.img2 = req.files.img2[0].path;
//     } else {
//         if (req.files.img) {
//             deleteFile(req.files.img[0].path);
//         }
//         if (req.files.img3) {
//             deleteFile(req.files.img3[0].path);
//         }
//         return res.status(400).json({ message: 'No ha sido introducida la primera imagen.' })
//     };
    
//     if (req.files.img && req.files.img2 && req.files.img3) {
//         newCake.img3 = req.files.img3[0].path;
//     } else {
//         if (req.files.img) {
//             deleteFile(req.files.img[0].path);
//         }
//         if (req.files.img3) {
//             deleteFile(req.files.img3[0].path);
//         }
//             return res.status(400).json({ message: 'No ha sido introducida la segunda imagen.' })
//     };
// };


/*
old
if (req.files) {
            if (req.files.img1) {
                newCake.img1 = req.files.img1[0].path;
                if (req.files.img2) {
                    newCake.img2 = req.files.img2[0].path;
                        if (req.files.img3) {
                            newCake.img3 = req.files.img3[0].path;
                        };
                } else {
                    return res.status(400).json({ message: 'No ha sido introducida la segunda imagen.' })
                };
            } else {
                if (req.files.img2) {
                    deleteFile(req.files.img2[0].path);
                }
                if (req.files.img3) {
                    deleteFile(req.files.img3[0].path);
                }
                return res.status(400).json({ message: 'No ha sido introducida ninguna imagen.' })
            };
        };
*/