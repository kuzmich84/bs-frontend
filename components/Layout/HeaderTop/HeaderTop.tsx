import React, {useEffect, useState} from 'react'
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
    useDisclosure, Text,
} from '@chakra-ui/react'
import {ChevronDownIcon} from '@chakra-ui/icons'
import {MdLogin} from 'react-icons/md'
import ModalCity from '../../Modal/ModalCity/ModalCity'
import {cities} from '../../../mock/cities'
import useStorage from '../../../hooks/useLocalStorage'

const HeaderTop = ({...props}: IHeaderTopProps): JSX.Element => {

    const {getItem, setItem} = useStorage()
    const initialCity = getItem('city', 'local') || 'Выберите город'
    const [city, setCity] = useState<string>(initialCity)
    const {isOpen, onOpen, onClose} = useDisclosure()


    useEffect(() => {
        setItem('city', city, 'local')
    }, [city])

    const buttonClickHandler = (evt: React.MouseEvent) => {
        evt.preventDefault()
        const {innerText} = evt.target as HTMLElement
        setCity(innerText)
    }


    return (
        <>
            <Container maxWidth="container.xl" display={{base: 'none', md: 'block'}}>
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
                                <Text as="span" display={{base: 'none', lg: 'inline'}}>Войти / Регистрация</Text>
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
