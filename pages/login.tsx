import type {NextPage} from 'next'

import {Box, Center, Container, Heading, Link, Text} from '@chakra-ui/react'
import LoginForm from '../components/Forms/LoginForm/LoginForm'
import NextLink from 'next/link'
import React from 'react'
import {API_ROUTE} from 'next/dist/lib/constants'
import {AppRoute} from '../interfaces/const'

const Login: NextPage = () => {

    return (
        <Box as="section" bg="#fafafa" padding="60px 0">
            <Container maxWidth={{md: '720px', lg: '1024px', xl: '1320px'}}>
                <Center>
                    <Box width="470px">
                        <Heading textAlign="center" as="h3" fontSize="25px" mb="5px">Вход в ваш аккаунт</Heading>
                        <Text textAlign="center" color="#6f7074" fontSize="15px" mb='40px'>Еще нет аккаунта?
                            <NextLink href={AppRoute.Register} passHref>
                                <Link ml={2} sx={{color: '#2441e7'}}>Регистрация!</Link>
                            </NextLink></Text>
                        <LoginForm/>
                    </Box>
                </Center>


            </Container>
        </Box>
    )
}

export default Login