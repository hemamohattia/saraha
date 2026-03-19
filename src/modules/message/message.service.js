import Message from "../../DB/model/message.js";
import User from "../../DB/model/user.js";

export const sendMessageService = async (senderId, { receiverId, content }) => {
  const receiver = await User.findById(receiverId);
  if (!receiver || receiver.isDeleted) throw Object.assign(new Error("Receiver not found"), { status: 404 });
  if (senderId.toString() === receiverId) throw Object.assign(new Error("Cannot send message to yourself"), { status: 400 });

  return await Message.create({ sender: senderId, receiver: receiverId, content });
};

export const listMessagesService = async (userId, otherId) => {
  return await Message.find({
    $or: [
      { sender: userId, receiver: otherId, isDeletedBySender: false },
      { sender: otherId, receiver: userId, isDeletedByReceiver: false },
    ],
  })
    .sort({ createdAt: 1 })
    .populate("sender", "name profileImage")
    .populate("receiver", "name profileImage");
};

export const getMessageByIdService = async (userId, messageId) => {
  const message = await Message.findById(messageId)
    .populate("sender", "name profileImage")
    .populate("receiver", "name profileImage");

  if (!message) throw Object.assign(new Error("Message not found"), { status: 404 });

  const isSender = message.sender._id.toString() === userId.toString();
  const isReceiver = message.receiver._id.toString() === userId.toString();

  if ((!isSender && !isReceiver) || (isSender && message.isDeletedBySender) || (isReceiver && message.isDeletedByReceiver))
    throw Object.assign(new Error("Message not found"), { status: 404 });

  return message;
};

export const deleteMessageService = async (userId, messageId) => {
  const message = await Message.findById(messageId);
  if (!message) throw Object.assign(new Error("Message not found"), { status: 404 });

  const isSender = message.sender.toString() === userId.toString();
  const isReceiver = message.receiver.toString() === userId.toString();

  if (!isSender && !isReceiver) throw Object.assign(new Error("Forbidden"), { status: 403 });

  if (isSender) message.isDeletedBySender = true;
  if (isReceiver) message.isDeletedByReceiver = true;

  if (message.isDeletedBySender && message.isDeletedByReceiver) {
    await Message.findByIdAndDelete(messageId);
  } else {
    await message.save();
  }
};