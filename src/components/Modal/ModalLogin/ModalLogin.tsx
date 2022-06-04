import React, {useState} from 'react'
import {IModalLoginProps} from './IModalLogin.props'
import {signOut, useSession} from 'next-auth/react'
import {
    Button,
    Icon,
    Modal, ModalBody, ModalCloseButton,
    ModalContent, ModalHeader,
    ModalOverlay, Tab, TabList, TabPanel, TabPanels, Tabs,
    Text, useDisclosure,
} from '@chakra-ui/react'
import LoginForm from '../../Forms/LoginForm/LoginForm'
import {MdLogin, MdLogout} from 'react-icons/md'
import RegisterForm from '../../Forms/RegisterForm/RegisterForm'
import {TabsNumber} from '../../../interfaces/const'

const ModalLogin = ({...props}: IModalLoginProps): JSX.Element => {
    const {isOpen, onOpen, onClose} = useDisclosure()
    const [tabIndex, setTabIndex] = useState(TabsNumber.Login)
    const {status, data:session} = useSession()
    return (
        <>
            <Button onClick={status === 'authenticated' ? () => signOut({callbackUrl: '/'}) : onOpen}
                    leftIcon={<Icon as={status === 'authenticated' ? MdLogout : MdLogin}/>} variant="link"
                    sx={{fontSize: '14px', fontFamily: 'Nunito', color: 'gray.600', marginTop: '4px'}}>
                <Text as="span" display={{
                    base: 'none',
                    lg: 'inline',
                }}>{status === 'authenticated' ?` ${session?.user?.name}` : 'Войти / Регистрация '}</Text>
            </Button>
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
