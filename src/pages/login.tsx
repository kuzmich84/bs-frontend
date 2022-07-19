import {Box, Center, Container} from '@chakra-ui/react'
import LoginForm from '../components/Forms/LoginForm/LoginForm'
import React from 'react'
import {GetServerSideProps} from 'next'
import {getSession} from 'next-auth/react'
import {AppRoute} from '../interfaces/const'


const Login = (): JSX.Element => {

    return (
        <Box as="section" bg="#fafafa" padding="60px 0" minHeight={'80vh'}>
            <Container maxWidth={{md: '720px', lg: '1024px', xl: '1320px'}}>
                <Center>
                    <Box width="470px">
                        <LoginForm/>
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
export default Login