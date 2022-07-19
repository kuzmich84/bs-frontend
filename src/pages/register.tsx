import type {NextPage} from 'next'
import {Box, Center, Container} from '@chakra-ui/react'
import React from 'react'
import RegisterForm from '../components/Forms/RegisterForm/RegisterForm'
import {GetServerSideProps} from 'next'
import {getSession} from 'next-auth/react'
import {AppRoute} from '../interfaces/const'

const Register: NextPage = () => {
    return (
        <Box as="section" bg="#fafafa" padding="60px 0" minHeight={'70vh'}>
            <Container maxWidth={{md: '720px', lg: '1024px', xl: '1320px'}}>
                <Center>
                    <Box width="470px">
                        <RegisterForm/>
                    </Box>
                </Center>
            </Container>
        </Box>
    )
}
export const getServerSideProps: GetServerSideProps = async (context) => {
    const session = await getSession({req: context.req})
    if (session) {
        return {
            redirect: {
                destination: AppRoute.Root,
                permanent: false,
            },
        }
    }

    return {
        props: {session},
    }
}

export default Register
