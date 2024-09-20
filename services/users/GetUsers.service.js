const UsersModel = require("../../models/users.model");
const { Op } = require('sequelize');

async function FetchUserService(id, role, paidMember) {
    try {
        let userList;

        if (id) {
            userList = await UsersModel.findOne({ where: { id: id } });
        } else if (role) {
            userList = await UsersModel.findAll({ where: { role: role } });
        } else if (paidMember) {
            userList = await UsersModel.findAll({ where: { paidMember: paidMember } });
        } else {
            userList = await UsersModel.findAll({ where: { role: { [Op.not]: 'super-admin' } } });
        }

        return {
            status: true,
            message: `Users List!`,
            count: Array.isArray(userList) ? userList.length : userList ? 1 : 0,
            data: userList
        };
    } catch (error) {
        console.error(error.message);
        return {
            status: false,
            message: error.message
        };
    }
}

module.exports = FetchUserService;
