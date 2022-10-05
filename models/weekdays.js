const mongoose = require('mongoose');

const weekdaysSchema = new mongoose.Schema({
    weekdays_item: {
        require: true,
        type: Date
    },
}, {timestamps: true})

module.exports = mongoose.model("Weekdays", weekdaysSchema)