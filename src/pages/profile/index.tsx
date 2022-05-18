import {getSession} from 'next-auth/react'
import {GetServerSideProps} from 'next'
import axios from 'axios'
import {IUser} from '../../interfaces/pages.interface'

const Profile = ({user}: IUser): JSX.Element => {

    return (
        <>
            <div>Page Profiles {user.username}</div>
            <img src={user.avatar} width="300px" height="auto"/>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const session = await getSession({req: context.req})
    if (!session) {
        return {
            redirect: {
                destination: '/login',
                permanent: false,
            },
        }
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/me`, {
        headers: {
            Authorization:
                `Bearer ${session.jwt}`,
        },
    })


    const data = await response.json()

    console.log(data)



    return {
        props: {user: data},
    }
}
export default Profile