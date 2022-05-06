import type {NextPage} from 'next'
import {Box, Center, Container} from '@chakra-ui/react'
import LoginForm from '../components/Forms/LoginForm/LoginForm'
import React from 'react'
import RegisterForm from '../components/Forms/RegisterForm/RegisterForm'
import TestForm from '../components/Forms/testForm'

const Register: NextPage = () => {
    return (
        <Box as="section" bg="#fafafa" padding="60px 0">
            <Container maxWidth={{md: '720px', lg: '1024px', xl: '1320px'}}>
                <Center>
                    <Box width="470px">
                        <RegisterForm/>
                        {/*<TestForm/>*/}
                    </Box>
                </Center>
            </Container>
        </Box>
    )
}

export default Register
