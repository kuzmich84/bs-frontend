import React, {useState} from 'react'
import {IChangePasswordFormProps} from './IChangePasswordForm.props'
import {useRouter} from 'next/router'
import * as Yup from 'yup'
import {SubmitHandler, useForm} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import {createUser} from '../../../lib/auth-fetch'
import {
    FormControl,
    FormErrorMessage,
    Heading, InputGroup, InputRightElement,
    VStack,
} from '@chakra-ui/react'
import InputTheme from '../../UI/Input/InputTheme'
import IconViewPassword from '../../Icons/IconViewPassword'
import ThemeButton from '../../UI/ThemeButton/ThemeButton'
import {AppRoute} from '../../../interfaces/const'



type Inputs = {
    oldPassword: string,
    password: string,
    confirmPassword: string,
}

type Error = {
    message?: string
}

const validationSchema = Yup.object().shape({
    oldPassword: Yup.string()
        .required('Обязательное поле к заполнению')
        .min(6, 'Пароль должен содержать не менее 6 символов'),
    password: Yup.string()
        .required('Обязательное поле к заполнению')
        .min(6, 'Пароль должен содержать не менее 6 символов'),
    confirmPassword: Yup.string()
        .required('Обязательное поле к заполнению')
        .oneOf([Yup.ref('password')], 'Пароли не совпадают'),
})

const ChangePasswordForm = ({...props}: IChangePasswordFormProps): JSX.Element => {

    const router = useRouter()

    const {
        handleSubmit,
        register,
        reset,
        formState: {errors, touchedFields},
    } = useForm<Inputs>({
        mode: 'onBlur',
        resolver: yupResolver(validationSchema),

    })

    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false)
    const [error, setError] = useState<string>('')

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        try {
            await createUser(data.name, data.email, data.password)
            reset()
            await router.push(AppRoute.Login)
        } catch (e: Error | any) {
            setError(e.message)
        }
    }


    const handleClickPassword = () => setShowPassword(!showPassword)
    const handleClickConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword)


    return (
        <>
            <Heading textAlign="center" as="h3" fontSize="25px" mb="5px">Изменть пароль</Heading>
            <form onSubmit={handleSubmit(onSubmit)}>
                <VStack spacing={4} align="stretch">

                    <FormControl isInvalid={!!errors.oldPassword}>
                        <InputGroup>
                            <InputTheme
                                isValid={touchedFields.oldPassword}
                                type={showPassword ? 'text' : 'password'}
                                id="old-password"
                                placeholder="Пароль"
                                {...register('oldPassword')}
                            />
                            <InputRightElement width="4.5rem" top="4px">
                                <IconViewPassword isShow={showPassword} handleClick={handleClickPassword}/>
                            </InputRightElement>
                        </InputGroup>
                        <FormErrorMessage>
                            {errors.oldPassword && errors.oldPassword.message}
                        </FormErrorMessage>
                    </FormControl>
                    <FormControl isInvalid={!!errors.password}>
                        <InputGroup>
                            <InputTheme
                                isValid={touchedFields.password}
                                type={showPassword ? 'text' : 'password'}
                                id="register-password"
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
                    <FormControl isInvalid={!!errors.confirmPassword}>
                        <InputGroup>
                            <InputTheme
                                isValid={touchedFields.confirmPassword}
                                type={showConfirmPassword ? 'text' : 'password'}
                                id="confirm_password"
                                placeholder="Повторите пароль"
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
        </>
    )
}

export default ChangePasswordForm
