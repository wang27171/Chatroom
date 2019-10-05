import Sequelize from 'sequelize';
import { _ } from 'lodash';
import faker from 'faker';

const db = new Sequelize('postgres://postgres:root@localhost:5432/chat');

// tabele, osnovni tipovi od kojih su sacinjeni ostali iz graphql scheme

const UserModel = db.define('user', {
  email: { type: Sequelize.STRING },
  username: { type: Sequelize.STRING },
  avatar: { type: Sequelize.STRING },
  description: { type: Sequelize.TEXT },
  isActive: { type: Sequelize.BOOLEAN },
  lastActiveAt: { type: Sequelize.DATE },
  password: { type: Sequelize.STRING },
});

const ChatModel = db.define('chat', {
  createdAt: { type: Sequelize.DATE },
  updatedAt: { type: Sequelize.DATE },
});

const MessageModel = db.define('message', {
  text: { type: Sequelize.TEXT },
  createdAt: { type: Sequelize.DATE },
});

UserModel.belongsToMany(ChatModel, { through: 'ChatUser' });
UserModel.belongsToMany(UserModel, { through: 'Contacts', as: 'contacts' });
UserModel.belongsTo(MessageModel);
ChatModel.belongsToMany(UserModel, { through: 'ChatUser' });

MessageModel.belongsTo(ChatModel);

const seed = () => {
  return Promise.all([
    UserModel.create({
      username: 'firstUser',
      email: faker.internet.email(),
      avatar: faker.internet.avatar(),
      description: faker.lorem.sentences(3),
      password: faker.internet.password(),
      isActive: true,
      lastActiveAt: new Date(),
    }),
    UserModel.create({
      username: 'secondUser',
      email: faker.internet.email(),
      avatar: faker.internet.avatar(),
      description: faker.lorem.sentences(3),
      password: faker.internet.password(),
      isActive: true,
      lastActiveAt: new Date(),
    }),
    ChatModel.create({
      createdAt: new Date(),
      updatedAt: new Date(),
    }),
    MessageModel.create({
      text: faker.lorem.sentences(3),
      createdAt: new Date(),
    }),
    MessageModel.create({
      text: faker.lorem.sentences(3),
      createdAt: new Date(),
    }),
  ])
    .then(([firstUser, secondUser, firstChat, firstMessage, secondMessage]) => {
      return Promise.all([
        firstUser.addChat(firstChat),
        secondUser.addChat(firstChat),
        firstUser.addContact(secondUser),
        secondUser.addContact(firstUser),
        /* firstChat.addUser(firstUser),// vec su u chatu
         firstChat.addUser(secondUser),*/

        firstMessage.setChat(firstChat),
        secondMessage.setChat(firstChat),
        firstUser.setMessage(secondMessage),
        secondUser.setMessage(firstMessage),
      ]);
    })
    .catch(error => console.log(error));
};

// db.sync({ force: true })
//   .then(() => seed())
//   .catch(error => console.log(error));

const Chat = db.models.chat;
const Message = db.models.message;
const User = db.models.user;

export { Chat, Message, User };
