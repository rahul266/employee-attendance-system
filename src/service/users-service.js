const { getModels } = require('../database')
const { instructors } = getModels()

exports.createUser = async (data) => {
    const { name, email } = data
    return await instructors.create({
        name: name,
        email:email
    })
}