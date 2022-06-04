import {getSession} from 'next-auth/react'
import {GetServerSideProps} from 'next'
import {IUser} from '../interfaces/pages.interface'
import {Box, Container} from '@chakra-ui/react'
import {AppRoute} from '../interfaces/const'
import {fetchAPI} from '../lib/api'
import Image from 'next/image'
import React from 'react'


const Profile = ({user}: IUser): JSX.Element => {

    return (
        <Container maxWidth={{md: '720px', lg: '1024px', xl: '1320px'}}>
            <div>Page Profiles {user.username}</div>
            <Box width="200px" height="auto">
                <Image
                src={user.avatar}
                layout="responsive"
                width="300px"
                height="300px"
                priority
            /></Box>

            <p>Роль: {user.role}</p>
        </Container>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const session = await getSession({req: context.req})
    if (!session) {
        return {
            redirect: {
                destination: AppRoute.Login,
                permanent: false,
            },
        }
    }

    const data = await fetchAPI('/users/me', {}, {
        headers: {
            Authorization:
                `Bearer ${session.jwt}`,
        },
    })

    return {
        props: {user: data},
    }
}
export default Profile