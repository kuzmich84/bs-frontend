import {JWT} from 'next-auth/jwt'

export interface IUserToken {
    token: JWT,
    user: {
        jwt: 'string',
        user: {
            id: string,
            username: string,
            email: string,
        }
    }
}