import axios from 'axios'

export const forgetPassword = async (userEmail:string) => {
    console.log(userEmail)
    try {
        const response = await axios
            .post('http://localhost:1338/api/auth/forgot-password', {
                email: userEmail, // user's email
            })
        return response

    } catch (e) {
        console.log(e.response)
    }
}    
