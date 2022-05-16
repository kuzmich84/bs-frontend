import React, {ReactNode} from 'react'

import {
    Box,
    Container, Heading, IconButton,
    Link,
    SimpleGrid,
    Stack,
    Text,
    useColorModeValue,
} from '@chakra-ui/react'

import {FaVk, FaTelegramPlane} from 'react-icons/fa'


const ListHeader = ({children}: { children: ReactNode }) => {
    return (
        <Text fontWeight={'500'} fontSize={'lg'} mb={2}>
            {children}
        </Text>
    )
}

const Footer = (): JSX.Element => {
    return (
        <Box
            bg="#222222"
            color="#ffffff">
            <Container as={Stack} maxW={'6xl'} py={10} fontSize='13px'>
                <SimpleGrid
                    templateColumns={{sm: '1fr 1fr', md: '2fr 1fr 1fr 1fr'}}
                    spacing={8}
                    mb='50px'
                >
                    <Stack spacing={6}>
                        <Heading as="h3" fontSize={{base: '16px', lg: '20px'}} mb='30px'>Beauty Schools</Heading>
                        <Stack direction={'row'} spacing={3}>
                            <IconButton size='sm' isRound aria-label='Мы в контакте' color='#222222' bg='#fff' icon={<FaVk />} />
                            <IconButton size='sm' isRound aria-label='Мы в контакте' color='#222222' bg='#fff' icon={<FaTelegramPlane />} />

                        </Stack>
                    </Stack>
                    <Stack align={'flex-start'}>
                        <Heading as='h4' fontSize='20px' textTransform='uppercase' mb='30px' fontWeight='400'>Продукты</Heading>
                        <Link href={'#'}>Курсы</Link>
                        <Link href={'#'}>Мастер классы</Link>
                        <Link href={'#'}>События</Link>
                        <Link href={'#'}>Цены</Link>
                    </Stack>
                    <Stack align={'flex-start'}>
                        <Heading as='h4' fontSize='20px' textTransform='uppercase' mb='30px' fontWeight='400'>О компании</Heading>
                        <Link href={'#'}>О нас</Link>
                        <Link href={'#'}>Блог</Link>
                        <Link href={'#'}>Контакты</Link>
                        <Link href={'#'}>Стать учителем</Link>
                    </Stack>
                    <Stack align={'flex-start'}>
                        <Heading as='h4' fontSize='20px' textTransform='uppercase' mb='30px' fontWeight='400'>Поддержка</Heading>
                        <Link href={'#'}>Центр помощи</Link>
                        <Link href={'#'}>Политика конфидециальности</Link>
                    </Stack>
                </SimpleGrid>
                <Text fontSize={'sm'} textAlign="center">
                    © {new Date().getFullYear()} Beauty Schools. Все права защищены.
                </Text>
            </Container>
        </Box>
    )
}

export default Footer