import {fetchAPI} from './api'
import axios from 'axios'

export const createAvatar = async (image: any, session: any, urlAvatar: string) => {
    const formData = new FormData()
    formData.append('userid', session.id)
    formData.append('picture', image)


    const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
    })

    const avatarUrl = await response.json()

    if (!response.ok) {
        throw new Error(avatarUrl.message || 'Something went wrong!')
    }

    const {data} = await axios.post(
        'http://localhost:1338/api/user/updateLoggedInUser',
        {
            data: {
                avatar: avatarUrl.url,
            },
        },
        {
            headers: {
                Authorization:
                    `Bearer ${session.jwt}`,
            },
        },
    )


    if (urlAvatar) {
        const urlAvatarPathname = new URL(urlAvatar).pathname
        await axios.delete(`/api/delete-avatar?url=${urlAvatarPathname}`)
    }

    return data

}