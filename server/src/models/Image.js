import { DataTypes, Sequelize } from 'sequelize';

import { sequelize } from '../sequelize';

/**
 * @typedef {object} ImageAttributes
 * @property {string} id
 * @property {string} alt
 */

/**
 * @typedef {import('sequelize').Model<ImageAttributes>} ImageModel
 */

/** @type {import('sequelize').ModelCtor<ImageModel>} */
const Image = sequelize.define('Image', {
  alt: {
    allowNull: false,
    defaultValue: '',
    type: DataTypes.STRING,
  },
  id: {
    allowNull: false,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
    type: DataTypes.UUID,
  },
  width: {
    allowNull: false,
    defaultValue: 0,
    type: DataTypes.NUMBER,
  },
  height: {
    allowNull: false,
    defaultValue: 0,
    type: DataTypes.NUMBER,
  },
  // todo: horrible
  smallWidth: {
    allowNull: false,
    defaultValue: 0,
    type: DataTypes.NUMBER,
  },
  smallHeight: {
    allowNull: false,
    defaultValue: 0,
    type: DataTypes.NUMBER,
  },
});

export { Image };
