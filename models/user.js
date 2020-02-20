'use strict';
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
    const user = sequelize.define('user', {
        email: {
            type: DataTypes.STRING,
            validate: {
                isEmail: {
                    msg: 'Invalid email address'
                }
            }
        },
        name: {
            type: DataTypes.STRING,
            validate: {
                len: {
                    args: [1, 99],
                    msg: 'Name must be between 1 and 99 characters'
                }
            }
        },
        password: {
            type: DataTypes.STRING,
            validate: {
                len: {
                    args: [8, 99],
                    msg: 'Password must be between 8 and 99 characters'
                }
            }
        }
    }, {
        hooks: {
            beforeCreate: function(createdUser, option) {
                if (createdUser && createdUser.password) {
                    // hash the password
                    let hash = bcrypt.hashSync(createdUser.password, 12);
                    // store the hash as the user's password
                    createdUser.password = hash;

                }
            }
        }
    });
    user.associate = function(models) {
        // associations can be defined here
    };
    //this compares entered password to hashed password
    user.prototype.validPassword = function(passwordTyped) {
        return bcrypt.compareSync(passwordTyped, this.password);
    };

    // this removes the password before serializing
    user.prototype.toJSON = function() {
        let userData = this.get();
        delete userData.password;
        return userData;
    }

    return user;
};