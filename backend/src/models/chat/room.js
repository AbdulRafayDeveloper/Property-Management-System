const mongoose = require("mongoose");
const roomSchema = new mongoose.Schema({
    participants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    }],
    isGroup: {
        type: Boolean,
        default: false
    },
    name: String,
    lastMessage: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ChatMessage'
    }
},{ timestamps: true });
const Room = mongoose.model("ChatRoom", roomSchema);
module.exports = Room;