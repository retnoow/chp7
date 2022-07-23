'use strict';
const {
  Model
} = require('sequelize');

const bcrypt = require('bcrypt')

module.exports = (sequelize, DataTypes) => {
  class user_game extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasOne(models.user_game_biodata, {foreignKey: "id_user"});
    }

    static #encrypt = (password) => bcrypt.hashSync(password, 10)

    static register = ({username, password}) =>{
      const encryptedPassword = this.#encrypt(password)

      return this.create({username, password:encryptedPassword})
    }


  }
  user_game.init({
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    isSuperAdmin: {
      defaultValue: false,
      type: DataTypes.BOOLEAN
    }
  }, {
    sequelize,
    modelName: 'user_game',
  });
  return user_game;
};