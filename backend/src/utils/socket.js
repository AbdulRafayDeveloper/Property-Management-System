const User = require('../models/user/user');
const socketIO = require('socket.io');
const cors = require('cors');
const logger = require('../utils/logger');
const Room = require('../models/chat/room')
const Message = require('../models/chat/message')
let ioInstance;
const allowedOrigins = ['*', 'http://localhost:52455/'];
const pendingSocketAcks = {};

function hosmintinaSocket(server) {
  ioInstance = socketIO(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST']
    },
    pingTimeout: 15000,  
    pingInterval: 25000, 
  });

  ioInstance.on('connection', (socket) => {
    logger.info(`User connected in Socket: ${socket.id}`);

    socket.joinedRooms = [];
    socket.on('joinHosmuntinaRoom', async ({ userId }) => {
      logger.info(`User ${socket.id} requested to join chat Room: ${userId} `);

      try {
        const user = await User.findById(userId);
        if (!user) {
          socket.emit('error', 'User not found');
        } else {
          logger.info(`User connected in Hosmuntina room: ${socket.id}`);

          socket.join(userId);
          logger.info(`User ${socket.id} joined room: ${userId}`);
          socket.emit('success', 'Room connected for Hosmuntina');
        }
      } catch (error) {
        logger.error(error.message);
        socket.emit('error', 'User not found');
      }
    });

    socket.on('leaveRoom', (roomId) => {
      if (roomId) {
        socket.leave(roomId);
        logger.info(`User ${socket.id} left room: ${roomId}`);
      } else {
        logger.error('No room ID provided');
      }
    });

    socket.on('joinRoom', async ({ roomId }) => {
      const room = await Room.findById(roomId);
      if (!room) {
        socket.emit('error', 'Room not found');
      } else {
        socket.joinedRooms.push(roomId);
        socket.join(roomId);
        socket.emit('success', 'Room connected and found');
      }

    });

    socket.on('sendMessage', async (data) => {
      const { roomId, sender, content } = data;
      if (!socket.joinedRooms.includes(roomId)) {
        return socket.emit('error', 'You have not joined this room.');
      }
      const message = new Message({ room: roomId, sender, content });
      await message.save();

      ioInstance.to(roomId).emit('receiveMessage', message);
    });

    socket.on('markMessageAsRead', async ({ messageId }, ackCallback) => {
      try {
        // Get the message
        const message = await Message.findById(messageId);
        if (!message) {
          return ackCallback({ status: false, message: 'Message not found' });
        }

        const room = await Room.findById(message.room);
        if (!room) {
          return ackCallback({ status: false, message: 'Room not found' });
        }

        // For one-on-one chats
        if (!room.isGroup) {
          message.isRead = true;
          await message.save();
          return ackCallback({ status: true, message: 'Message marked as read' });
        }

        // For group chats
        // if (!message.readBy.includes(socket.userId)) { // Assuming socket.userId is available from your auth process
        //     message.readBy.push(socket.userId);
        //     await message.save();
        // }

        return ackCallback({ status: true, message: 'Message marked as read' });
      } catch (error) {
        console.error(error.message);
        return ackCallback({ status: false, message: 'Server error' });
      }
    });

    socket.on('joinNotificationRoom', async ({ userId }) => {
      console.log(`User ${socket.id} requested to join chat Room: ${userId} `);

      try {
        const user = await User.findById(userId);
        if (!user) {
          socket.emit('error', 'User not found');
        } else {
          console.log('User connected in Notification room:', socket.id);

          socket.join(userId);
          console.log(`User ${socket.id} joined room: ${userId}`);
          socket.emit('success', 'Room connected for Notifications');
        }
      } catch (error) {
        console.log(error.message);
        socket.emit('error', 'User not found');
      }


    });

    socket.on('disconnect', () => {
      logger.info(`User disconnected: ${socket.id}`);
    });
  });
}

function getIOInstance() {
  if (!ioInstance) {
    throw new Error('Socket.IO instance not initialized');
  }
  return ioInstance;
}


module.exports = { hosmintinaSocket, getIOInstance };
