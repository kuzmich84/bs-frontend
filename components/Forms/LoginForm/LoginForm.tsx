import React from 'react'
import {ILoginFormProps} from './ILoginForm.props'
import {
    Checkbox,
    Divider,
    Flex,
    FormControl,
    FormErrorMessage,
    Link,
    VStack,
    Text,
    SimpleGrid,
} from '@chakra-ui/react'
import {SubmitHandler, useForm} from 'react-hook-form'
import ThemeButton from '../../UI/ThemeButton/ThemeButton'
import InputTheme from '../../UI/Input/InputTheme'
import NextLink from 'next/link'
import {AppRoute} from '../../../interfaces/const'
import {FaGoogle, FaVk} from 'react-icons/fa'
import SocialButton from '../../UI/SocialButton/SocialButton'

type Inputs = {
    email: string,
    password: string,
}

const LoginForm = ({...props}: ILoginFormProps): JSX.Element => {

    const {
        handleSubmit,
        register,
        reset,
        formState: {errors, isSubmitting},
    } = useForm<Inputs>({
        mode: 'onBlur',
    })

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        console.log(data)
        reset()
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <VStack spacing={4} align="stretch">
                <FormControl isInvalid={!!errors.email || undefined}>
                    <InputTheme
                        id="email"
                        placeholder="Email адрес"
                        {...register('email', {
                            required: 'Обязательное поле к заполненинию',
                            pattern: {
                                value: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i,
                                message: 'Введите верный email адрес',
                            },
                        })}
                    />
                    <FormErrorMessage>
                        {errors.email && errors.email.message}
                    </FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={!!errors.password}>
                    <InputTheme
                        type="password"
                        id="password"
                        placeholder="Пароль"
                        {...register('password', {
                            required: 'Обязательное поле к заполненинию',
                            minLength: {value: 6, message: 'Минимальная длина пароля 6 символов'},
                        })}
                    />
                    <FormErrorMessage>
                        {errors.password && errors.password.message}
                    </FormErrorMessage>
                </FormControl>
                <Flex>
                    <Checkbox iconColor="#fff"><Text as="span" fontSize="15px">Запомнить меня</Text></Checkbox>
                    <NextLink href={AppRoute.Register} passHref>
                        <Link marginLeft="auto" sx={{color: '#c75533', fontSize: '15px'}}>Забыли пароль?</Link>
                    </NextLink>
                </Flex>
                <ThemeButton color="#fff" bg="#192675">Войти</ThemeButton>
                <Flex align="center">
                    <Divider/>
                    <Text padding={5} fontSize="15px" fontWeight="400" color="#6f7074">Или</Text>
                    <Divider/>
                </Flex>
                <SimpleGrid columns={{sm: 1, md: 2}} spacingX='30px'>
                    <SocialButton bg="#3B5998" leftIcon={<FaVk/>}> Вконтакте</SocialButton>
                    <SocialButton bg="#EA4335" leftIcon={<FaGoogle/>}>Google</SocialButton>
                </SimpleGrid>
            </VStack>
        </form>
    )
}

export default LoginForm
