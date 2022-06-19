import {IRegisterFormProps} from './IRegisterForm.props'
import {SubmitHandler, useForm} from 'react-hook-form'
import {
    Alert,
    AlertIcon, AlertTitle,
    Checkbox,
    Divider,
    Flex,
    FormControl,
    FormErrorMessage,
    Heading, InputGroup, InputRightElement,
    Link,
    SimpleGrid,
    Text,
    VStack,
} from '@chakra-ui/react'
import NextLink from 'next/link'
import {AppRoute, TabsNumber} from '../../../interfaces/const'
import InputTheme from '../../UI/Input/InputTheme'
import ThemeButton from '../../UI/ThemeButton/ThemeButton'
import SocialButton from '../../UI/SocialButton/SocialButton'
import {FaGoogle, FaVk} from 'react-icons/fa'
import * as Yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'
import {useState} from 'react'
import IconViewPassword from '../../Icons/IconViewPassword'
import {useRouter} from 'next/router'
import {createUser} from '../../../lib/auth-fetch'


type Inputs = {
    email: string,
    password: string,
    name: string,
    confirmPassword: string,
}

type Error = {
    message?: string
}

const RegisterForm = ({onCloseRegisterForm, onChangeTab}: IRegisterFormProps): JSX.Element => {

    const router = useRouter()

    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .required('Обязательное поле к заполнению')
            .min(4, 'Минимальная длина имени 4 символа'),
        email: Yup.string()
            .required('Обязательное поле к заполнению')
            .email('Введите верный email адрес'),
        password: Yup.string()
            .required('Обязательное поле к заполнению')
            .min(6, 'Пароль должен содержать не менее 6 символов'),
        confirmPassword: Yup.string()
            .required('Обязательное поле к заполнению')
            .oneOf([Yup.ref('password')], 'Пароли не совпадают'),
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


    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false)
    const [error, setError] = useState<string>('')
    const [isSendRegisterForm, setIsSendRegisterForm] = useState<boolean>(false)

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        try {
            await createUser(data.name, data.email, data.password)
            reset()
            setIsSendRegisterForm(true)
        } catch (e: Error | any) {
            setError(e.message)
        }
    }


    const handleClickPassword = () => setShowPassword(!showPassword)
    const handleClickConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword)

    if (isSendRegisterForm) {
        return (
            <Alert status="success">
                <AlertIcon/>
                На ваш email отправлена ссылка для подтверждения. Проверьте свою почту.
            </Alert>
        )
    }


    return (
        <>
            <Heading textAlign="center" as="h3" fontSize="25px" mb="5px">Регистрация</Heading>
            <Text textAlign="center" color="#6f7074" fontSize="15px" mb="40px">Уже есть аккаунт?
                <NextLink href={onChangeTab ? '' : AppRoute.Login} passHref>
                    <Link onClick={() => onChangeTab ? onChangeTab(TabsNumber.Login) : null} ml={2}
                          sx={{color: '#2441e7'}}>Bойти!</Link>
                </NextLink></Text>
            <form onSubmit={handleSubmit(onSubmit)}>
                {error === 'Email is already taken' && (
                    <Alert status="error" fontSize="14px" mb={4}>
                        <AlertIcon/>
                        <AlertTitle>Пользователь с таким email уже существует. Пожалуйста введите другой. </AlertTitle>
                    </Alert>
                )}
                <VStack spacing={4} align="stretch">
                    <FormControl isInvalid={!!errors.name}>
                        <InputTheme
                            isValid={touchedFields.name}
                            id="name"
                            placeholder="Ваше имя"
                            {...register('name')}
                        />
                        <FormErrorMessage>
                            {errors.name && errors.name.message}
                        </FormErrorMessage>
                    </FormControl>
                    <FormControl isInvalid={!!errors.email}>
                        <InputTheme
                            isValid={touchedFields.email}
                            id="register-email"
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
                    <Flex>
                        <Checkbox iconColor="#fff"><Text as="span" fontSize="15px" color="#6f7074">Хотите
                            преподавать?</Text></Checkbox>
                    </Flex>
                    <ThemeButton type="submit" color="#fff" bg="#192675">Регистрация</ThemeButton>
                    <Flex align="center">
                        <Divider/>
                        <Text padding={5} fontSize="15px" fontWeight="400" color="#6f7074">или</Text>
                        <Divider/>
                    </Flex>
                    <SimpleGrid columns={{sm: 1, md: 2}} spacingX="30px" spacingY="20px">
                        <SocialButton onClick={() => onCloseRegisterForm ? onCloseRegisterForm : null} bg="#3B5998"
                                      leftIcon={<FaVk/>}> Вконтакте</SocialButton>
                        <SocialButton bg="#EA4335" leftIcon={<FaGoogle/>}>Google</SocialButton>
                    </SimpleGrid>
                </VStack>
            </form>
        </>
    )

}

export default RegisterForm
