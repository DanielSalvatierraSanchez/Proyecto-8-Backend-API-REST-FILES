const cloudinary = require('cloudinary').v2;

const connectCloudinary = () => {
    try {
        cloudinary.config({
            cloud_name: process.env.CLOUD_NAME,
            api_key: process.env.API_KEY,
            api_secret: process.env.API_SECRET,
        })
        console.log('✅ Conectado con exito CLoudinary');
    } catch (error) {
        console.log('❌ Error al conectar Cloudinary');
    }
}

module.exports = { connectCloudinary };