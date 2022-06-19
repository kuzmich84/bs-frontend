export interface IUser {
    id: number,
    username: string,
    avatar?: string,
    role: string,
    city?: string,
    firstName?: string,
    lastName?: string,
    phone?: string,
    about?: string,
    odnoklassniki: string,
    vk: string

}

export interface ISession {
    id: number,
    jwt: string
}

export interface IAvatarFormProps {
    user: IUser,
    session: ISession
}

export interface IData {
    avatar: string
}
