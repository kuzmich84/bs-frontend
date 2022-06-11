import {getSession, useSession} from 'next-auth/react'
import {GetServerSideProps} from 'next'

import {
    Box,
    Container,
    Flex,
    Grid,
    GridItem,
    Heading,
    Spacer,
    Avatar,
    VisuallyHidden, VStack, FormLabel, Icon, FormControl, FormErrorMessage,
} from '@chakra-ui/react'
import {AppRoute} from '../../interfaces/const'
import {fetchAPI} from '../../lib/api'
import NextBreadcrumb from '../../components/Layout/Breadcrumb/NextBreadcrumb'
import {IUser} from '../../interfaces/pages.interface'
import styles from './form.module.scss'
import {MdAddAPhoto} from 'react-icons/md'
import {useForm} from 'react-hook-form'
import React, {useEffect, useState} from 'react'
import ThemeButton from '../../components/UI/ThemeButton/ThemeButton'
import * as Yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'
import {createAvatar} from '../../lib/photo-fetch'

type Inputs = {
    avatar: string,
}


const Profile = ({user}: IUser): JSX.Element => {

    const {data: session} = useSession()
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
    const {register, handleSubmit, watch, formState: errors} = useForm<Inputs>({
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


    const onSubmit = async (data) => {
        try {
            if (data.avatar.length > 0) {
                setIsLoading(true)
                await createAvatar(data.avatar[0], session, avatar)
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
        <Box as="section" backgroundColor="#f9fafc" pt={30}>
            <Container width="100%" maxWidth="none">
                <Grid
                    templateColumns="20% 80%"
                >
                    <GridItem>
                        <Heading as="h4" fontSize={18} color="0a0a0a">Аккаунт</Heading>
                    </GridItem>
                    <GridItem>

                        <Flex
                            maxWidth="100%"
                            alignItems="center"
                            backgroundColor="rgb(225, 230, 239)"
                            borderRadius="5px"
                            p="20px 30px"
                            mb={30}
                        >
                            <Heading as="h4" fontSize={22} color="rgb(10, 10, 10)" fontWeight={600}>
                                Личный кабинет
                            </Heading>
                            <Spacer/>
                            <NextBreadcrumb/>
                        </Flex>
                        <Box
                            backgroundColor="#ffffff"
                            maxWidth="100%"
                            borderRadius={5}
                            boxShadow="0 1px 4px 0 rgb(0 0 0 / 9%)">
                            <Heading
                                as="h4"
                                fontSize={18}
                                color="#0a0a0a"
                                borderBottom="1px solid #eeeeee"
                                p={30}
                                fontWeight={500}
                            >Личные данные</Heading>
                            <Flex>
                                <VStack
                                    p={10}
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
                            </Flex>
                        </Box>
                    </GridItem>
                </Grid>
            </Container>
        </Box>
    )
}


export const getServerSideProps: GetServerSideProps = async (context) => {
    const session = await getSession({req: context.req})
    if (!session) {
        return {
            redirect: {
                destination: AppRoute.Login,
                permanent: false,
            },
        }
    }

    const data = await fetchAPI('/users/me', {}, {
        headers: {
            Authorization:
                `Bearer ${session.jwt}`,
        },
    })

    return {
        props: {user: data},
    }
}

export default Profile

