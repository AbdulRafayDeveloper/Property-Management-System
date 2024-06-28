const express = require('express');
const app = express();
const auth = require('../../config/auth');
const Room = require('../../models/chat/room')
const Message = require('../../models/chat/message');

//Get the latest Chat between two persons 
//Pass Id of person in params with whom you want to get the chat
//Pass token of logged in user
//Also can apply pagination like page=2 to get more chat
app.get('/chats/:userId', auth, async (req, res) => {
    const userId = req.params.userId;
    const user2Id = req.user._id;

    // const page = parseInt(req.query.page, 10) || 1;
    // const limit = 25;
    // const skip = (page - 1) * limit;

    try {
        // Find the room where both users are participants
        const room = await Room.findOne({
            participants: { $all: [userId, user2Id] }
        });

        if (!room) {
            return res.status(404).json({ status: false, message: 'Room not found' });
        }

        const messages = await Message.find({ room: room._id })
            .sort({ 'timestamp': -1 })
            // .skip(skip)
            // .limit(limit);

        if (!messages) {
            return res.status(500).json({ status: false, message: 'Error fetching messages' });
        }

        if (messages.length === 0) {
            return res.status(200).json({ status: true, message: 'No messages found for the chat', data: [] });
        }

        return res.status(200).json({ status: true, message: 'Got all the messages', data: {messages} });


    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: false, message: `Server error ${error.message}` });
    }
});



module.exports = app;