// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiRequest, NextApiResponse} from 'next'
import axios, {AxiosError} from 'axios'

type Data = {
    message?: string,
    username?: string,
    email?: string,
    password?: string,
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>,
) {
    if (req.method === 'POST') {
        const data = req.body
        const {username, email, password} = data

        if (!username || username.trim().length < 3 || !email || !email.includes('@') || !password || password.trim().length < 6) {
            res.status(422).json({message: 'Неверный ввод поля формы'})
            return
        }
        console.log()
        try {
            await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/local/register`, {
                username: username,
                email: email,
                password: password,
                role: 2
            })
            res.status(201).json({message: 'Пользователь создан'})

        } catch (e) {
            if (e instanceof AxiosError) {
                const errorData = e.response?.data
                res.status(errorData.error.status).json({message: errorData.error.message})
            } else {
                console.log('Unexpected error', e)
            }
        }
    }
}
