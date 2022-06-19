import React, {useState} from 'react'
import {IEmailFormProps} from './IEmailForm.props'
import styles from './EmailForm.module.scss'
import {SubmitHandler, useForm} from 'react-hook-form'
import {
    FormControl,
    FormErrorMessage,
    Alert,
    AlertIcon,
    Text,
    Heading,
    useColorModeValue,
    Stack,
} from '@chakra-ui/react'
import InputTheme from '../../UI/Input/InputTheme'
import * as yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import ThemeButton from '../../UI/ThemeButton/ThemeButton'
import {forgetPassword} from '../../../lib/forget-password'

type Input = {
    email: string,
}

type Result = {
    error: string | null
}


const EmailForm = ({...props}: IEmailFormProps): JSX.Element => {
    const schema = yup.object().shape({
        email: Yup.string()
            .required('Обязательное поле к заполнению')
            .email('Введите корректный email адрес'),
    })

    const {handleSubmit, register, reset, formState: {errors}} = useForm<Input>({
        mode: 'onBlur',
        resolver: yupResolver(schema),
    })

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [isSuccess, setIsSuccess] = useState<boolean>(false)
    const [error, setError] = useState<string>('')


    const onSubmit: SubmitHandler<Input> = async (data) => {
        setIsLoading(true)
        const response = await forgetPassword(data.email)
        setIsLoading(false)
        if (response) {
            setIsSuccess(true)
            reset()
        } else {
            setError('Email не найден. Введите другой email.')
        }
    }
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
                    Забыли свой пароль?
                </Heading>
                <Text
                    fontSize={{base: 'sm', sm: 'md'}}
                    color={'gray.800'}>
                    На ваш email придет письмо с ссылкой для восстановления пароля.
                </Text>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <FormControl isInvalid={!!errors.email}>
                        <InputTheme
                            id="email"
                            placeholder="Email адрес"
                            {...register('email')}
                            onChange={() => {
                                setIsSuccess(false)
                                setError('')
                            }}
                        />
                        <FormErrorMessage>
                            {errors.email && errors.email.message}
                        </FormErrorMessage>
                    </FormControl>
                    <ThemeButton isLoading={isLoading} mt={5} mb={4} type="submit" color="#fff"
                                 bg="#192675">Отправить</ThemeButton>
                </form>
                {isSuccess && (
                    <Alert status="success">
                        <AlertIcon/>
                        Письмо отправлено. Проверьте ваш email.
                    </Alert>
                )}

                {error && (
                    <Alert status="error">
                        <AlertIcon/>
                        {error}
                    </Alert>
                )}
            </Stack>
        </>
    )
}

export default EmailForm
