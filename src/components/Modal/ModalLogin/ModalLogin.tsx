import React, {useState} from 'react'
import {IModalLoginProps} from './IModalLogin.props'
import {signOut, useSession} from 'next-auth/react'
import {
    Button,
    Icon, Menu, MenuButton, MenuDivider, MenuItem, MenuList,
    Modal, ModalBody, ModalCloseButton,
    ModalContent, ModalHeader,
    ModalOverlay, Tab, TabList, TabPanel, TabPanels, Tabs,
    Text, useDisclosure,
} from '@chakra-ui/react'
import LoginForm from '../../Forms/LoginForm/LoginForm'
import {MdLogout} from 'react-icons/md'
import RegisterForm from '../../Forms/RegisterForm/RegisterForm'
import {AppRoute, TabsNumber} from '../../../interfaces/const'
import {ChevronDownIcon} from '@chakra-ui/icons'
import {useRouter} from 'next/router'

const ModalLogin = ({...props}: IModalLoginProps): JSX.Element => {
    const {isOpen, onOpen, onClose} = useDisclosure()
    const [tabIndex, setTabIndex] = useState(TabsNumber.Login)
    const {status, data: session} = useSession()
    const router = useRouter()

    const loginButton = (status: string) => {
        if (status === 'authenticated') {
            return (
                <Menu>
                    <MenuButton
                        transition="all 0.2s"
                        _hover={{textDecoration: 'underline'}}
                    >
                        <Text as="span" fontSize="14px" color="gray.600" marginTop={4}>{session?.user?.email}</Text>
                        <ChevronDownIcon/>
                    </MenuButton>
                    <MenuList
                        color="gray.600"
                        fontSize={14}
                        fontFamily="Nunito"
                    >
                        <MenuItem onClick={() => router.push(AppRoute.Profile)}>
                            Личный кабинет
                        </MenuItem>

                        <MenuDivider/>
                        <MenuItem onClick={() => signOut({callbackUrl: AppRoute.Root})}>

                            Выйти

                        </MenuItem>

                    </MenuList>
                </Menu>
            )
        }
        return (
            <Button
                onClick={onOpen}
                variant="link"
                leftIcon={<Icon as={MdLogout}/>}
                sx={{fontSize: '14px', fontFamily: 'Nunito', color: 'gray.600', marginTop: '4px'}}>
                <Text as="span" display={{
                    base: 'none',
                    lg: 'inline',
                }}>{'Войти / Регистрация '}</Text>
            </Button>
        )

    }
    return (
        <>
            {loginButton(status)}
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay/>
                <ModalContent>
                    <ModalHeader/>
                    <ModalCloseButton/>
                    <ModalBody>
                        <Tabs index={tabIndex} onChange={(index) => setTabIndex(index)} isFitted variant="enclosed">
                            <TabList mb="1em">
                                <Tab>Войти</Tab>
                                <Tab>Регистрация</Tab>
                            </TabList>
                            <TabPanels>
                                <TabPanel>
                                    <LoginForm onCloseLoginForm={onClose} onChangeTab={setTabIndex}/>
                                </TabPanel>
                                <TabPanel>
                                    <RegisterForm onCloseRegisterForm={onClose} onChangeTab={setTabIndex}/>
                                </TabPanel>
                            </TabPanels>
                        </Tabs>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}

export default ModalLogin
