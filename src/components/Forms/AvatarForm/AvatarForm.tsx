import React, {useEffect, useState} from 'react'
import {IAvatarFormProps, IData} from './IAvatarForm.props'
import styles from './AvatarForm.module.scss'
import {
    Avatar,
    Flex,
    FormErrorMessage,
    FormLabel,
    Icon,
    VisuallyHidden,
    VStack,
    Tooltip,
    FormControl,
} from '@chakra-ui/react'
import {MdAddAPhoto} from 'react-icons/md'
import ThemeButton from '../../UI/ThemeButton/ThemeButton'
import {createAvatar} from '../../../lib/photo-fetch'
import * as Yup from 'yup'
import {useForm} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'


type Inputs = {
    avatar: string,
}
const AvatarForm = ({user, session}: IAvatarFormProps): JSX.Element => {

    const [image, setImage] = useState(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [isDisabled, setIsDisabled] = useState<boolean>(true)
    const [avatar, setAvatar] = useState<string>('')

    useEffect(() => {
        setAvatar(user.avatar)
    }, [user.avatar])


    const validationSchema = Yup.object().shape({
        avatar: Yup.mixed().test('required', 'Выберите файл', value => {
            return value && value.length
        }),

    })
    const {register, handleSubmit, formState: errors} = useForm<Inputs>({
        resolver: yupResolver(validationSchema),
    })


    const convert2base64 = (data) => {
        const reader = new FileReader()
        reader.onloadend = () => {
            setImage(reader.result.toString())
        }
        reader.readAsDataURL(data)
    }


    const uploadToClient = (evt) => {
        if (evt.target.files && evt.target.files[0]) {
            setIsDisabled(false)
            const tmpImage = evt.target.files[0]
            convert2base64(tmpImage)


        }
    }

    const onSubmit = async (data: IData) => {
        try {
            if (data.avatar.length > 0) {
                setIsLoading(true)
                const {avatar: avatarUrl} = await createAvatar(data.avatar[0], session)
                setAvatar(avatarUrl)
                setIsLoading(false)
                setIsDisabled(true)

            } else {
                return
            }

        } catch (e) {
            console.log(e)
        }

    }

    return (
            <VStack
                pl={10}
                pr={10}
                pt={5}

            >
                <Avatar
                    size="2xl"
                    name={user.username}
                    src={image !== null ? image : avatar}
                />
                <form
                    className={styles.form}
                    encType="multipart/form-data"
                    name="upload-avatar "
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <Tooltip label="Загрузить фото"  bg='white' color='black' placement='right-start' openDelay={200} aria-label="A tooltip" >
                        <FormLabel
                            position="absolute"
                            color="#232323"
                            borderRadius="50%"
                            backgroundColor="rgb(0,0,0,0.5)"
                            w={50}
                            h={50}
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                            _hover={{cursor: 'pointer'}}
                            top="-20px"
                            left="30px"
                        >

                            <VisuallyHidden>
                                <input
                                    {...register('avatar')}
                                    type="file"
                                    onChange={uploadToClient}

                                />
                            </VisuallyHidden>


                            <Icon fontSize={25} color="white" as={MdAddAPhoto}/>
                        </FormLabel>
                    </Tooltip>

                    <FormErrorMessage>
                        {errors.avatar && errors.avatar.message}
                    </FormErrorMessage>

                    <ThemeButton
                        height="45px"
                        isLoading={isLoading}
                        isDisabled={isDisabled}
                        type="submit"
                        color="#ffffff"
                        bg="#2441e7"
                        mt={50}
                    >Сохранить</ThemeButton>

                </form>
            </VStack>
    )
}

export default AvatarForm
