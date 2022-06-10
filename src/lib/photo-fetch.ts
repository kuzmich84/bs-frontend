export const createAvatar = async (image: any) => {
    const formData = new FormData()
    formData.append('picture', image)


    const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
    })

    const data = await response.json()
    console.log('data', data)

    if (!response.ok) {
        throw new Error(data.message || 'Something went wrong!')
    }

}