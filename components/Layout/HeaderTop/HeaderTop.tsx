import React, {useState} from 'react'
import {IHeaderTopProps} from './IHeaderTop.props'
import styles from './HeaderTop.module.scss'
import {
    Flex,
    Container,
    Link,
    List,
    ListItem,
    Spacer,
    Divider,
    Button,
    Icon,
    useDisclosure,
} from '@chakra-ui/react'
import {ChevronDownIcon} from '@chakra-ui/icons'
import {MdLogin} from 'react-icons/md'
import ModalCity from '../../Modal/ModalCity'
import {cities} from '../../../mock/cities'

const HeaderTop = ({...props}: IHeaderTopProps): JSX.Element => {

    const [city, setCity] = useState<string>('Выберите город')
    const {isOpen, onOpen, onClose} = useDisclosure()

    const buttonClickHandler = (evt: React.MouseEvent) => {
        evt.preventDefault()
        const {innerText} = evt.target as HTMLElement
        setCity(innerText)
    }


    return (
        <>
            <Container maxWidth="container.xl">
                <Flex minWidth="max-content" alignItems="center" gap="2" height="40px">
                    <List display="flex">
                        <ListItem>
                            <Link href="tel:+79215777600"
                                  sx={{fontSize: '14px', fontFamily: 'Nunito', color: 'gray.600'}}>
                                +7(921)5777600
                            </Link>
                        </ListItem>
                        <ListItem sx={{marginLeft: '35px'}}>
                            <Link href="mailto:mail@beautyschools.ru"
                                  sx={{fontSize: '14px', fontFamily: 'Nunito', color: 'gray.600'}}>
                                mail@beautyschools.ru
                            </Link>
                        </ListItem>
                    </List>
                    <Spacer/>
                    <List display="flex">
                        <ListItem>
                            <Button leftIcon={<Icon as={MdLogin}/>} variant="link"
                                    sx={{fontSize: '14px', fontFamily: 'Nunito', color: 'gray.600', marginTop: '4px'}}>
                                Войти / Регистрация
                            </Button>
                        </ListItem>
                        <ListItem sx={{marginLeft: '35px'}}>
                            <Button onClick={onOpen} rightIcon={<ChevronDownIcon/>} variant="link"
                                    sx={{fontSize: '14px', fontFamily: 'Nunito', color: 'gray.600', marginTop: '4px'}}>
                                {city}
                            </Button>
                        </ListItem>
                    </List>
                </Flex>
            </Container>
            <Divider/>
            <ModalCity isOpen={isOpen} onClose={onClose} cities={cities} onButtonClick={buttonClickHandler}/>
        </>
    )
}

export default HeaderTop