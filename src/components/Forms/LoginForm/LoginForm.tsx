import React, {useContext, useState} from 'react'
import {ILoginFormProps} from './ILoginForm.props'
import {signIn} from 'next-auth/react'
import {
    Checkbox,
    Divider,
    Flex,
    FormControl,
    FormErrorMessage,
    Link,
    VStack,
    Text,
    SimpleGrid, Heading, InputGroup, InputRightElement, Alert, AlertIcon, AlertTitle,
} from '@chakra-ui/react'
import {SubmitHandler, useForm} from 'react-hook-form'
import ThemeButton from '../../UI/ThemeButton/ThemeButton'
import InputTheme from '../../UI/Input/InputTheme'
import NextLink from 'next/link'
import {AppRoute, TabsNumber} from '../../../interfaces/const'
import {FaGoogle, FaVk} from 'react-icons/fa'
import SocialButton from '../../UI/SocialButton/SocialButton'
import * as Yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'
import IconViewPassword from '../../Icons/IconViewPassword'
import {useRouter} from 'next/router'


type Inputs = {
    email: string,
    password: string,
}

type Result = {
    error: string | null
}

const LoginForm = ({onCloseLoginForm, onChangeTab}: ILoginFormProps): JSX.Element => {

    const [showPassword, setShowPassword] = useState<boolean>(false)
    const handleClickPassword = () => setShowPassword(!showPassword)

    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .required('Обязательное поле к заполнению')
            .email('Введите верный email адрес'),
        password: Yup.string()
            .required('Обязательное поле к заполнению')
            .min(6, 'Пароль должен содержать не менее 6 символов'),
    })


    const {
        handleSubmit,
        register,
        reset,
        formState: {errors, touchedFields},
    } = useForm<Inputs>({
        mode: 'onBlur',
        resolver: yupResolver(validationSchema),
    })

    const router = useRouter()
    const [error, setError] = useState<boolean>(false)

    const onSubmit: SubmitHandler<Inputs> = async (data) => {

        const result: Result = await signIn('credentials', {
            redirect: false,
            email: data.email,
            password: data.password,
            callbackUrl: '/profiles',
        }) || {error: null}

        if (result.error) {
            setError(true)
        } else {
            setError(false)
            reset()
            if (onCloseLoginForm) {
                onCloseLoginForm()
            }
            await router.push(AppRoute.Profile)
        }
    }
    return (
        <>
            <Heading textAlign="center" as="h3" fontSize="25px" mb="5px">Вход в ваш аккаунт</Heading>
            <Text textAlign="center" color="#6f7074" fontSize="15px" mb="40px">Еще нет аккаунта?
                <NextLink href={onChangeTab ? '' : AppRoute.Register} passHref>
                    <Link onClick={() => onChangeTab ? onChangeTab(TabsNumber.Register) : null} ml={2}
                          sx={{color: '#2441e7'}}>Регистрация!</Link>
                </NextLink></Text>
            <form onSubmit={handleSubmit(onSubmit)}>
                {error && (
                    <Alert status="error" fontSize="14px" mb={4}>
                        <AlertIcon/>
                        <AlertTitle>Введенный email или пароль неверный.</AlertTitle>
                    </Alert>
                )}
                <VStack spacing={4} align="stretch">
                    <FormControl isInvalid={!!errors.email}>
                        <InputTheme
                            isValid={touchedFields.email}
                            id="email"
                            placeholder="Email адрес"
                            {...register('email')}
                        />
                        <FormErrorMessage>
                            {errors.email && errors.email.message}
                        </FormErrorMessage>
                    </FormControl>

                    <FormControl isInvalid={!!errors.password}>
                        <InputGroup>
                            <InputTheme
                                isValid={touchedFields.password}
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                placeholder="Пароль"
                                {...register('password')}
                            />
                            <InputRightElement width="4.5rem" top="4px">
                                <IconViewPassword isShow={showPassword} handleClick={handleClickPassword}/>
                            </InputRightElement>
                        </InputGroup>
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
                    <ThemeButton color="#fff" bg="#192675" type="submit">Войти</ThemeButton>
                    <Flex align="center">
                        <Divider/>
                        <Text padding={5} fontSize="15px" fontWeight="400" color="#6f7074">или</Text>
                        <Divider/>
                    </Flex>
                    <SimpleGrid columns={{sm: 1, md: 2}} spacingX="30px" spacingY="20px">
                        <SocialButton onClick={onCloseLoginForm} bg="#3B5998"
                                      leftIcon={<FaVk/>}> Вконтакте</SocialButton>
                        <SocialButton bg="#EA4335" leftIcon={<FaGoogle/>}>Google</SocialButton>
                    </SimpleGrid>
                </VStack>
            </form>
        </>
    )
}


export default LoginForm
