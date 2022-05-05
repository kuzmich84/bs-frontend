import React from 'react'
import {IMenuDrawerProps} from './IMenuDrawer.props'
import {
    Drawer,
    DrawerBody,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Center, List, ListItem, Link, Divider, Box, Icon,
} from '@chakra-ui/react'
import styles from './MenuDrawer.module.scss'
import {IDrawer} from '../../../../interfaces/common'
import NextLink from 'next/link'
import {MdLogin, MdAppRegistration} from 'react-icons/md'
import {AppRoute} from '../../../../interfaces/const'

const MenuDrawer = ({isOpen, onClose, btnRef, pages}: IDrawer): JSX.Element => {
    return (
        <Drawer
            isOpen={isOpen}
            placement="left"
            onClose={onClose}
            finalFocusRef={btnRef}
            size="md"
        >
            <DrawerOverlay/>
            <DrawerContent>
                <DrawerCloseButton/>
                <Center>
                    <DrawerHeader fontFamily="Nunito" textTransform="uppercase">Меню</DrawerHeader>
                </Center>
                <DrawerBody p={0} m={0}>
                    <List fontFamily="Nunito" textTransform="uppercase">
                        {pages.map((page) => (
                            <Box key={page.name}>
                                <ListItem onClick={onClose} padding="12px 20px">
                                    <NextLink href={page.url} passHref>
                                        <Link>{page.name}</Link>
                                    </NextLink>
                                </ListItem>
                                <Divider/>
                            </Box>

                        ))}
                        <ListItem onClick={onClose} padding="12px 20px" key="login" display="flex">
                            <>
                                <Icon as={MdLogin} boxSize={5} color="gray.500" mr={2}/>
                                <NextLink href={AppRoute.Login}>
                                    <Link>Войти</Link>
                                </NextLink>
                            </>
                        </ListItem>
                        <Divider/>
                        <ListItem onClick={onClose} padding="12px 20px" key="registration" display="flex">
                            <>
                                <Icon as={MdAppRegistration} boxSize={5} color="gray.500" mr={2}/>
                                <NextLink href={AppRoute.Register}>
                                    <Link>Регистрация</Link>
                                </NextLink>
                            </>

                        </ListItem>
                    </List>
                </DrawerBody>

            </DrawerContent>
        </Drawer>
    )
}

export default MenuDrawer
