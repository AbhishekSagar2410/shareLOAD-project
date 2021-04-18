
const mongoose=require('mongoose');

let RateSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }   
});

module.exports = mongoose.model('Ratecollection', RateSchema);


