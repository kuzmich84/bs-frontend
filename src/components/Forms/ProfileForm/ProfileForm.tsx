import React, {useState} from 'react'
import {IProfileFormProps} from './IProfileForm.props'
import {useForm} from 'react-hook-form'
import styles from './ProfileForm.module.scss'
import {Box, FormControl, FormErrorMessage, FormLabel, Flex, Heading} from '@chakra-ui/react'
import InputTheme from '../../UI/Input/InputTheme'
import {yupResolver} from '@hookform/resolvers/yup'
import * as yup from 'yup'
import ThemeButton from '../../UI/ThemeButton/ThemeButton'
import {postPersonalData} from '../../../lib/post-personal-data'
import {useSession} from 'next-auth/react'
import TextareaTheme from '../../UI/TextareaTheme/TextareaTheme'

const phoneRegExp = /^((8|\+7)[- ]?)?(\(?\d{3}\)?[- ]?)?[\d\- ]{7,10}$/

const schema = yup.object().shape({
    username: yup.string().required('Обязательное поле к заполнению').min(4, 'В имени должно быть больше 3 сомволов'),
    lastName: yup.string(),
    city: yup.string().required('Обязательное поле к заполнению'),
    phone: yup.string().matches(phoneRegExp, 'Формат номера неверный'),
    about: yup.string(),
    vk: yup.string().url('Введите ссылку на вашу страничку в социальной сети'),
    odnoklassniki: yup.string().url('Введите ссылку на вашу страничку в одноклассниках'),
})

const ProfileForm = ({user}: IProfileFormProps): JSX.Element => {
    const {data: session} = useSession()
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [isDisabled, setIsDisabled] = useState<boolean>(true)

    const {username, lastName, city, phone, about, vk, odnoklassniki} = user

    const {handleSubmit, register, formState: {errors}} = useForm({
        resolver: yupResolver(schema),
    })

    const onChange = () => {
        setIsDisabled(false)
    }

    const onSubmit = async (data: any) => {
        setIsLoading(true)
        const responseUser = await postPersonalData(data, session)
        setIsLoading(false)
        setIsDisabled(true)
    }

    return (
        <Box>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.form} id="personal-form">
                <Box className={styles.formItem}>
                    <FormControl isInvalid={!!errors.username}>
                        <FormLabel htmlFor="username" fontSize={14}>Имя</FormLabel>
                        <InputTheme
                            type="text"
                            {...register('username')}
                            defaultValue={username}
                            onChange={onChange}
                        />
                        <FormErrorMessage>
                            {errors.username && errors.username.message}
                        </FormErrorMessage>
                    </FormControl>
                </Box>
                <Box className={styles.formItem}>
                    <FormControl isInvalid={!!errors.lastName}>
                        <FormLabel htmlFor="lastName" fontSize={14}>Фамилия</FormLabel>
                        <InputTheme
                            type="text"
                            {...register('lastName')}
                            defaultValue={lastName}
                            onChange={onChange}
                        />
                        <FormErrorMessage>
                            {errors.lastName && errors.lastName.message}
                        </FormErrorMessage>
                    </FormControl>
                </Box>
                <Box className={styles.formItem}>
                    <FormControl isInvalid={!!errors.city}>
                        <FormLabel htmlFor="city" fontSize={14}>Город</FormLabel>
                        <InputTheme
                            type="text"
                            {...register('city')}
                            defaultValue={city}
                            onChange={onChange}

                        />
                        <FormErrorMessage>
                            {errors.city && errors.city.message}
                        </FormErrorMessage>
                    </FormControl>
                </Box>
                <Box className={styles.formItem}>
                    <FormControl isInvalid={!!errors.phone}>
                        <FormLabel htmlFor="phone" fontSize={14}>Телефон</FormLabel>
                        <InputTheme
                            type="text"
                            {...register('phone')}
                            defaultValue={phone}
                            onChange={onChange}
                        />
                        <FormErrorMessage>
                            {errors.phone && errors.phone.message}
                        </FormErrorMessage>
                    </FormControl>
                </Box>
                <Box className={styles.formItemTextArea} mb={10}>
                    <FormControl isInvalid={!!errors.about} fontSize={14}>
                        <FormLabel htmlFor="about" fontSize={14}>Немного о себе</FormLabel>
                        <TextareaTheme
                            {...register('about')}
                            defaultValue={about}
                            onChange={onChange}
                        />
                        <FormErrorMessage>
                            {errors.about && errors.about.message}
                        </FormErrorMessage>
                    </FormControl>
                </Box>

                    <Heading width='100%' as="h5" fontSize={16} color="rgb(10, 10, 10)" fontWeight={600} mb={5}>
                        Социальные сети
                    </Heading>
                <Flex width='100%' flexWrap='wrap'>
                    <Box className={styles.formItem} width='45%' flexGrow={1}>
                        <FormControl isInvalid={!!errors.vk}>
                            <FormLabel htmlFor="vk" fontSize={14}>Вконтакте</FormLabel>
                            <InputTheme
                                type="text"
                                {...register('vk')}
                                defaultValue={vk}
                                onChange={onChange}
                            />
                            <FormErrorMessage>
                                {errors.vk && errors.vk.message}
                            </FormErrorMessage>
                        </FormControl>
                    </Box>
                    <Box className={styles.formItem} width='45%' flexGrow={1}>
                        <FormControl isInvalid={!!errors.odnoklassniki}>
                            <FormLabel htmlFor="" fontSize={14}>Одноклассники</FormLabel>
                            <InputTheme
                                type="text"
                                {...register('odnoklassniki')}
                                defaultValue={odnoklassniki}
                                onChange={onChange}
                            />
                            <FormErrorMessage>
                                {errors.odnoklassniki && errors.odnoklassniki.message}
                            </FormErrorMessage>
                        </FormControl>
                    </Box>
                </Flex>
                <Box width="100%">
                    <ThemeButton isLoading={isLoading} isDisabled={isDisabled} width="" height="45"
                                 form="personal-form"
                                 color="#fff"
                                 bg="#192675"
                                 type="submit"
                                 mt={6}
                    >Сохранить</ThemeButton>
                </Box>
            </form>


        </Box>
    )
}

export default ProfileForm
