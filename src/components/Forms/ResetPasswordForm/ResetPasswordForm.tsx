import React, {useState} from 'react'
import {IDataPassword, IResetPasswordFormProps} from './IResetPasswordForm.props'
import styles from './ResetPasswordForm.module.scss'
import * as yup from 'yup'
import * as Yup from 'yup'
import {FieldValues, SubmitHandler, useForm} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import {
    FormControl,
    FormErrorMessage,
    Alert,
    AlertIcon,
    InputGroup,
    InputRightElement,
    VStack,
    Link, useColorModeValue, Heading, Text, Stack,
} from '@chakra-ui/react'
import InputTheme from '../../UI/Input/InputTheme'
import IconViewPassword from '../../Icons/IconViewPassword'
import ThemeButton from '../../UI/ThemeButton/ThemeButton'
import NextLink from 'next/link'
import {AppRoute} from '../../../interfaces/const'
import {resetPass} from '../../../lib/reset-password'


const ResetPasswordForm = ({privateCode}: IResetPasswordFormProps): JSX.Element => {

    const schema = yup.object().shape({
        password: Yup.string()
            .required('Обязательное поле к заполнению')
            .min(6, 'Пароль должен содержать не менее 6 символов'),
        confirmPassword: Yup.string()
            .required('Обязательное поле к заполнению')
            .oneOf([Yup.ref('password')], 'Пароли не совпадают'),

    })

    const {register, handleSubmit, reset, formState: {errors, touchedFields}} = useForm<IDataPassword>({
        mode: 'onBlur',
        resolver: yupResolver(schema),
    })


    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false)
    const [isSuccessAlert, setIsSuccessAlert] = useState<boolean>(false)
    const [error, setError] = useState<string>('')


    const onSubmit: SubmitHandler<IDataPassword> = async (data) => {
        try {
            if (!privateCode) {
                return
            }
            await resetPass(data.password, privateCode)
            setIsSuccessAlert(true)
            reset()
        } catch (e: Error | any) {
            setError('Что-то пошло не так. Просьба ввести пароли заново')
        }
    }


    const handleClickPassword = () => setShowPassword(!showPassword)
    const handleClickConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword)

    return (
        <>
            <Stack
                spacing={4}
                w={'full'}
                maxW={'md'}
                bg={useColorModeValue('white', 'gray.700')}
                rounded={'xl'}
                boxShadow={'lg'}
                p={6}
            >
                <Heading lineHeight={1.1} fontSize={{base: '2xl', md: '3xl'}}>
                    Восстановление пароля
                </Heading>
                <Text
                    fontSize={{base: 'sm', sm: 'md'}}
                    color={'gray.800'}>
                    Придумайте новый надежный пароль
                </Text>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <VStack spacing={4} align="stretch">
                        <FormControl isInvalid={!!errors.password}>
                            <InputGroup>
                                <InputTheme
                                    isValid={touchedFields.password}
                                    type={showPassword ? 'text' : 'password'}
                                    id="register-password"
                                    placeholder="Новый пароль"
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
                        <FormControl isInvalid={!!errors.confirmPassword}>
                            <InputGroup>
                                <InputTheme
                                    isValid={touchedFields.confirmPassword}
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    id="confirm_password"
                                    placeholder="Повторите новый пароль"
                                    {...register('confirmPassword')}
                                />
                                <InputRightElement width="4.5rem" top="4px">
                                    <IconViewPassword isShow={showConfirmPassword}
                                                      handleClick={handleClickConfirmPassword}/>
                                </InputRightElement>
                            </InputGroup>
                            <FormErrorMessage>
                                {errors.confirmPassword && errors.confirmPassword.message}
                            </FormErrorMessage>
                        </FormControl>
                        <ThemeButton type="submit" color="#fff" bg="#192675">Отправить</ThemeButton>
                    </VStack>
                </form>
                {isSuccessAlert && <Alert status="success">
                    <AlertIcon/>
                    Пароль изменен успешно.
                    <NextLink href={AppRoute.Login} passHref>
                        <Link>Перейдите на страницу входа</Link>
                    </NextLink>
                </Alert>}
                {error && <Alert status="error">
                    <AlertIcon/>
                    {error}
                </Alert>}
            </Stack>
        </>
    )
}

export default ResetPasswordForm
