const cakeRoutes = require('express').Router();
const upload = require('../../middleware/file');
const { getCakeByName, getAllCakes, updateCake, deleteCake, createCake } = require('../controllers/cake');

cakeRoutes.post('/register', upload.fields([{ name: "img" }, { name: "img2" }, { name: "img3" }]), createCake)
cakeRoutes.get('/getBy/:name', getCakeByName)
cakeRoutes.get('/', getAllCakes)
cakeRoutes.put('/update/:id', upload.fields([{ name: "img" }, { name: "img2" }, { name: "img3" }]), updateCake)
cakeRoutes.delete('/delete/:id', deleteCake)

module.exports = cakeRoutes;