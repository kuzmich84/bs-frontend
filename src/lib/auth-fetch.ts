export const createUser = async (username: string, email: string, password: string) => {
    const response = await fetch('/api/auth/signup', {
        method: 'POST',
        body: JSON.stringify({username, email, password}),
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
        },
    })

    const data = await response.json()

    if (!response.ok) {
        throw new Error(data.message || 'Something went wrong!')
    }
}

