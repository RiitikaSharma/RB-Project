const mongoose = require('mongoose');

let dataSchema = new mongoose.Schema({
    
    user: {
        type: String,
        required: 'User id can\'t be empty'
    },
    personal: {
        type: Object,
        required: 'Personal fields can\'t be empty',
    },
    education: {
        type: Object,
        required: 'Education fields can\'t be empty',
    },
    professional: {
        type: Object
    },
    others: {
        type: Object,
        required: 'other fields can\'t be empty',
    },
});

mongoose.model('Data', dataSchema);