import mongoose from 'mongoose';

const mongoConn  = mongoose.connect('mongodb+srv://feres997:feres997@cluster0.peiowiq.mongodb.net/portfolio4')
    .then(() => {
        console.log("mongoDb connected successfully !");
    })
    .catch((err) => {
        console.log('something went wrong while connection with mongoDb ! : ' + err);
    })

    export default mongoConn;