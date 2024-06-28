
const express = require('express');
const app = express();
const auth = require('../../config/auth');
const Room = require('../../models/chat/room')
const Message = require('../../models/chat/message');

//Create the room for the user
//Pass the userid with whom you want to create the room
//Pass token of the signed in user
//If room already exist it will return room and messages
app.post('/rooms/:userId', auth, async (req, res) => {
    const participantId = req.params.userId;
    const userId = req.user._id;
    const { name } = req.body;

    // Ensure participants are provided
    if (!participantId || !userId) {
        return res.status(400).json({ status: false, message: 'Both participants are required.' });
    }

    const participants = [participantId, userId];
    const limit = 25;

    try {
        // Check if a room already exists for the given participants (for one-on-one chats)
        let existingRoom = await Room.findOne({ participants: { $all: participants } });

        // If room already exists, fetch its messages and return them along with the room
        if (existingRoom) {
            const messages = await Message.find({ room: existingRoom._id })
                                          .sort({ 'timestamp': -1 })
                                          .limit(limit);

            if (!messages) {
                return res.status(500).json({ status: false, message: 'Error fetching messages' });
            }

            return res.status(200).json({
                status: true,
                message: 'Room already exists',
                data: { room: existingRoom, messages: messages || [] }
            });
        }

        // If room doesn't exist, create a new room
        const room = new Room({ participants, name });
        await room.save();

        return res.status(201).json({ status: true, message: 'Room created successfully', data: { room, messages: [] } });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: false, message: `Server error ${error.message}` });
    }
});


//Get all the rooms of the logged in user
app.get('/rooms/', auth, async (req, res) => {
    const userId = req.user._id;

    try {

        const rooms = await Room.find({ participants: userId })
            .sort({ 'updatedAt': -1 }).populate("participants",'-password -tokens');

        if (!rooms) {
            return res.status(500).json({ status: false, message: 'Error fetching rooms' });
        }

        if (rooms.length === 0) {
            return res.status(200).json({ status: true, message: 'No rooms found for the user', data: [] });
        }

        const modifiedRooms = rooms.map(room => {
            const roomObj = room.toObject();
            roomObj.participants = roomObj.participants.map(participant => {
                return {
                    ...participant,
                    isSender: participant._id.toString() === userId.toString()
                };
            });
            return roomObj;
        });
        return res.status(200).json({ status: true, message: 'Retrieved user rooms', data: modifiedRooms });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: false, message: `Server error ${error.message}` });
    }
});


//Get all users in this group chat by providing id of room in the params
app.get('/rooms/users/:roomId/', auth, async (req, res) => {
    const roomId = req.params.roomId;
    const userId = req.user._id;

    try {
        // Fetch the room by its ID
        const room = await Room.findById(roomId).populate('participants'); 

        if (!room) {
            return res.status(404).json({ status: false, message: 'Room not found' });
        }

        // Check if the user making the request is a participant in the room
        if (!room.participants.some(participant => participant._id.equals(userId))) {
            return res.status(403).json({ status: false, message: 'You are not a participant in this room' });
        }

        return res.status(200).json({ status: true, data: room.participants });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: false, message: `Server error: ${error.message}` });
    }
});



module.exports = app;