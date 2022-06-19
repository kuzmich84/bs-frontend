import {getSession, useSession} from 'next-auth/react'
import {GetServerSideProps} from 'next'

import {
    Box,
    Container,
    Flex,
    Grid,
    GridItem,
    Heading, Link, List, ListIcon, ListItem,
    Spacer,
} from '@chakra-ui/react'
import {AppRoute} from '../../interfaces/const'
import {fetchAPI} from '../../lib/api'
import NextBreadcrumb from '../../components/Layout/Breadcrumb/NextBreadcrumb'
import {IProfilePage} from '../../interfaces/pages.interface'
import React from 'react'
import AvatarForm from '../../components/Forms/AvatarForm/AvatarForm'
import ProfileForm from '../../components/Forms/ProfileForm/ProfileForm'
import {FiSettings} from 'react-icons/fi'
import NextLink from 'next/link'


const Profile = ({user}: IProfilePage): JSX.Element => {

    const {data: session} = useSession()

    return (
        <Box as="section" backgroundColor="#f9fafc" padding="60px">
            <Container width="100%" maxWidth="none">
                <Grid
                    templateColumns="20% 80%"
                >
                    <GridItem>
                        <Heading as="h4" fontSize={18} color="0a0a0a" mb={2}>Аккаунт</Heading>
                        <List width="100%" color="#7f7f7f" fontSize={16}>
                            <ListItem _hover={{color: '#2441E7', textDecoration: 'none'}}>
                                <ListIcon fontSize={23} as={FiSettings} color="#7f7f7f"/>
                                <NextLink href={AppRoute.Profile}>
                                    <Link>Личные данные</Link>
                                </NextLink>
                            </ListItem>
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
                                <AvatarForm user={user} session={session}/>
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

export default Profile

