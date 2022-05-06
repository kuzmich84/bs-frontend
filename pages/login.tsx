import type {NextPage} from 'next'

import {Box, Center, Container, Heading, Link, Text} from '@chakra-ui/react'
import LoginForm from '../components/Forms/LoginForm/LoginForm'
import NextLink from 'next/link'
import React from 'react'
import {AppRoute} from '../interfaces/const'

const Login: NextPage = () => {

    return (
        <Box as="section" bg="#fafafa" padding="60px 0">
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

export default Login