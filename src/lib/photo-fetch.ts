import axios from 'axios'

export const createAvatar = async (image: any, session: any) => {
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
        `${process.env.NEXT_PUBLIC_API_URL}/user/updateLoggedInUser`,
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


    if (data.avatar) {
        const urlAvatarPathname = new URL(data.avatar).pathname
        await axios.delete(`/api/delete-avatar?url=${urlAvatarPathname}`)
    }

    return data

}