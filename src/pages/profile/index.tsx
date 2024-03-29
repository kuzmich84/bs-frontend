import {getSession, signOut, useSession} from 'next-auth/react'
import {GetServerSideProps} from 'next'

import {
    Avatar,
    Box,
    Container,
    Flex,
    Grid,
    GridItem,
    Heading, Icon, IconButton, Link, List, ListIcon, ListItem,
    Spacer, Stack, Tooltip, VStack,
} from '@chakra-ui/react'
import {AppRoute} from '../../interfaces/const'
import {fetchAPI} from '../../lib/api'
import NextBreadcrumb from '../../components/Layout/Breadcrumb/NextBreadcrumb'
import {IProfilePage} from '../../interfaces/pages.interface'
import React, {useState} from 'react'
import ProfileForm from '../../components/Forms/ProfileForm/ProfileForm'
import {FiSettings, FiLogOut} from 'react-icons/fi'
import NextLink from 'next/link'
import {MdAddAPhoto} from "react-icons/md";
import ModalAvatar from "../../components/Modal/ModalAvatar/ModalAvatar";
import LayoutProfile from "../../components/Layout/LayoutProfile";


const Profile = ({user}: IProfilePage): JSX.Element => {

    const {data: session} = useSession()
    const [isModalAvatar, setIsModalAvatar] = useState<boolean>(false)


    const onCloseModalAvatar = () => {
        setIsModalAvatar(false);
    }


    return (
        <Box as="section" backgroundColor="#f9fafc" padding="60px">
            <Container width="100%" maxWidth="none">
                <Grid
                    templateColumns="20% 80%"
                >
                    <GridItem>
                        <Heading as="h4" fontSize={18} color="0a0a0a" mb={5}>Аккаунт</Heading>
                        <List width="100%" color="#7f7f7f" fontSize={16}>
                            <Stack gap={4}>
                                <ListItem _hover={{color: '#2441E7'}}>
                                    <ListIcon fontSize={23} as={FiSettings} color="#7f7f7f"/>
                                    <NextLink href={AppRoute.Profile}>
                                        <Link>Личные данные</Link>
                                    </NextLink>
                                </ListItem>
                                <ListItem _hover={{color: '#2441E7'}}>
                                    <ListIcon fontSize={23} as={FiLogOut} color="#7f7f7f"/>
                                    <Link onClick={() => signOut({callbackUrl: AppRoute.Root})}>Выйти</Link>
                                </ListItem>
                            </Stack>
                        </List>
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
                            <Flex pt={5}>
                                <VStack
                                    pl={10}
                                    pr={10}
                                    pt={5}
                                    position="relative"

                                >
                                    <Avatar
                                        size="2xl"
                                        name={user.username}
                                        src={user.avatar}

                                    />
                                    <Tooltip label="Загрузить фото" bg='white' color='black' placement='right-start'
                                             openDelay={200} aria-label="A tooltip">
                                        <IconButton
                                            onClick={() => setIsModalAvatar(true)}
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
                                            top="100px"
                                            right="30px"
                                            aria-label='Загрузить фото'
                                            icon={<Icon fontSize={25} color="white" as={MdAddAPhoto}/>}/>
                                    </Tooltip>

                                    <ModalAvatar user={user} session={session} isModalOpen={isModalAvatar}
                                                 onClose={onCloseModalAvatar}/>
                                </VStack>
                                <ProfileForm user={user}/>
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

Profile.layout = LayoutProfile
export default Profile

