import User from '../models/User.Model';

export const getUsers = async () => {
    try {
        const users = await User.findAll({ where: { role: "user" } })
        return users;
    } catch (error: any) {
        throw new Error(error.message)
    }
}

export const deleteUser = async (id: string) => {
    try {
        const user = await getUser(id)
        if (user) {
            await User.destroy({
                where: {
                    id: id,
                },
            });
        }
    } catch (error: any) {
        throw new Error(error.message)
    }
}

export const getUser = async (id: string) => {
    try {
        const user = await User.findOne({ where: { id: id } })
        if (!user) {
            throw new Error("User not found");
        }

        return user;
    } catch (error: any) {
        throw new Error(error.message)
    }
}