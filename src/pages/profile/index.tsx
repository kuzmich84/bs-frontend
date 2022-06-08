import {getSession} from 'next-auth/react'
import {GetServerSideProps} from 'next'

import {
    Box,
    Container,
    Flex,
    Grid,
    GridItem,
    Heading,
    Spacer,
    Button,
    Avatar,
    VisuallyHidden, VStack, FormLabel, Icon,
} from '@chakra-ui/react'
import {AppRoute} from '../../interfaces/const'
import {fetchAPI} from '../../lib/api'
import NextBreadcrumb from '../../components/Layout/Breadcrumb/NextBreadcrumb'
import {IUser} from '../../interfaces/pages.interface'
import styles from './form.module.scss'
import {MdAddAPhoto} from 'react-icons/md'
import {useForm} from 'react-hook-form'
import {useState} from 'react'


const Profile = ({user}: IUser): JSX.Element => {
    const {register, handleSubmit} = useForm()
    const [image, setImage] = useState()
    console.log(image)

    const uploadToClient = (evt)=> {
        if(evt.target.files && evt.target.files[0]) {
            const tmpImage = evt.target.files[0].name;
            setImage(tmpImage)


        }
    }


    const onSubmit = (data) => {
        console.log(data)
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
                                        src={user.avatar || image}
                                    />
                                    <form
                                        className={styles.form}
                                        encType="multipart/form-data"
                                        name="upload-avatarnpm "
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
                                            left="-25px"
                                        >
                                            <VisuallyHidden>
                                                <input
                                                    {...register("avatar-upload")}
                                                    type="file"
                                                    onChange={uploadToClient}
                                                />
                                            </VisuallyHidden>
                                            <Icon fontSize={25} color="white" as={MdAddAPhoto}/>
                                        </FormLabel>
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

