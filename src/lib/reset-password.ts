import axios from 'axios'

export const resetPass = async (newPassword: string, privateCode: string) => {
    console.log(privateCode)
    console.log(newPassword)
    axios
        .post(`${process.env.NEXT_PUBLIC_API_URL}/auth/reset-password`, {
            code: privateCode, // code contained in the reset link of step 3.
            password: newPassword,
            passwordConfirmation: newPassword,
        })
        .then((response) => {
            console.log('Your user\'s password has been reset.')
        })
        .catch((error) => {
            console.log('An error occurred:', error.response)
        })


}