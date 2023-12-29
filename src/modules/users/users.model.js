

import { DataTypes } from 'sequelize';
import { sequelize } from './../../config/database/database.js';
import { encryptPass } from '../../config/plugin/encript-pass.plugin.js';



const User = sequelize.define('users', {
  id: {
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    type: DataTypes.INTEGER,
  },
  name: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(80),
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM('client', 'employee'),
    allowNull: false,
    defaultValue: 'client'
  },
  status: {
    type: DataTypes.ENUM('available', 'disabled'),
    allowNull: false,
    defaultValue: 'available',
  },
}, {
  hooks: {
    beforeCreate: async (user) => {
      user.password = await encryptPass(user.password)
    },
  },
}
);

export default User;
