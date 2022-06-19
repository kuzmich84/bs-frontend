import axios from 'axios'
import {log} from 'util'

export const postPersonalData = async (data, session) => {
    console.log(data)
    try {
        const personalData = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/user/updateLoggedInUser`, {
                data: data,
            },
            {
                headers: {
                    Authorization:
                        `Bearer ${session.jwt}`,
                },
            })
        return personalData

    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.log(error)
        } else {
            console.log(error)
        }
    }


}