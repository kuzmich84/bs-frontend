import React from 'react'
import {IMainMenuProps} from './IMainMenu.props'
import NextLink from 'next/link'
import {MdSearch} from 'react-icons/md'
import {
    Avatar,
    Box,
    Flex,
    Heading,
    IconButton,
    Link,
    List,
    ListItem,
    useBreakpointValue, useDisclosure,
} from '@chakra-ui/react'

import ModalSearch from '../../Modal/ModalSearch/ModalSearch'
import MenuGamburger from './MenuGamburger/MenuGamburger'

const MainMenu = ({pages, profile}: IMainMenuProps): JSX.Element => {
    const {isOpen, onOpen, onClose} = useDisclosure()
    const variantIconSearch = useBreakpointValue({base: 35, md: 20})


    return (
        <>
            <Flex minWidth="max-content" alignItems="center" gap="2" height={20}>
                <Box p="2">
                    <Link href="/">
                        <Heading fontSize={{base: '25px', lg: '36px'}}>Beauty Schools</Heading>
                    </Link>
                </Box>
                <Box as="nav" display={{base: 'none', md: 'block'}} alignItems="center"
                     marginLeft={profile ? "20px" : "auto"}>
                    <List gap="8" display="flex" fontFamily="Nunito" textTransform="uppercase">
                        {pages.map((page) => (
                            <ListItem key={page.name}>
                                <NextLink href={page.url} passHref>
                                    <Link>{page.name}</Link>
                                </NextLink>
                            </ListItem>))}
                    </List>
                </Box>
                <Box display={{base: 'flex'}} marginLeft={{base: 'auto', md: 15}}>
                    {!profile && (
                        <IconButton onClick={onOpen} aria-label="Search database" variant="unstyled"
                                    icon={<MdSearch size={variantIconSearch}/>}/>
                    )}
                    <MenuGamburger/>
                </Box>

                {profile && (
                    <Box display={{base: 'flex'}} marginLeft="auto">
                        <Avatar
                            size={'md'}
                            src={'https://avatars.dicebear.com/api/male/username.svg'}
                        />
                    </Box>
                )}


            </Flex>
            <ModalSearch isOpen={isOpen} onClose={onClose}/>
        </>
    )
}

export default MainMenu
