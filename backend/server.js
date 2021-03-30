const app = require('./app');
const connectDatabase = require('./config/database')

const dotenv = require('dotenv');
const cloudinary = require('cloudinary')

//handle the uncought exception 
process.on('uncaughtException', err => {
    console.log(`ERROR: ${err.stack}`);
    console.log('Shutting down server due to uncought exceptions');
    process.exit(1)
})

//setting up config file
dotenv.config({ path: 'backend/config/config.env' })

//connecting to database
connectDatabase();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

const server = app.listen(process.env.PORT, () => {
    console.log(`server started on PORT: ${process.env.PORT} in ${process.env.NODE_ENV} mode.`)
})

//handle unhandled promise rejections
process.on('unhandledRejection', err => {
    console.log(`ERROR : ${err.messsage}`)
    console.log('shutting down the server due to unhandled promise rejection');
    server.close(() => {
        process.exit(1)
    })
})

