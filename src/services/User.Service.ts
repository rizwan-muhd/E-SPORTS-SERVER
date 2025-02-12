import User from '../models/User.Model';

export const getUsers = async () => {
    try {
        const users = await User.findAll({ where: { role: "user" } })
        return users;
    } catch (error: any) {
        throw new Error(error.message)
    }
}