const { prisma } = require('./prisma');

const findUserByEmail = async (email) => {
    const user = await prisma.users.findFirst({
        where: {
            email
        }
    });

    return user;
}

module.exports = {
    findUserByEmail
}