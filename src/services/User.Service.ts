import User from '../models/User.Model';


export interface UserAttributes {
    id: string;
    name: string;
    email: string;
    password: string;
    role: "user" | "admin";
    phone?: string;
    address?: object;
    status: "active" | "in-active" | "blocked";
    createdAt?: Date;
    updatedAt?: Date;
}

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

export const updateUser = async (data: Partial<UserAttributes>) => {
    try {
        const _id: string = data.id!;
        const user = await getUser(_id);
        if (!user) {
            throw new Error("User not found");
        }

        const _user = await User.update(data, {
            where: { id: _id },
            returning: true,
        });

        return { message: "User updated successfully", _user };
    } catch (error: any) {
        throw new Error(error.message);
    }
};