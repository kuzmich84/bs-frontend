import React from 'react'
import {ICardProps} from './ICard.props'
import styles from './Card.module.scss'
import {Box, Heading, Icon, Text, VStack, Flex, HStack} from '@chakra-ui/react'
import Image from 'next/image'
import {BsPerson} from 'react-icons/bs'
import {BiCommentDetail} from 'react-icons/bi'

const Card = ({...props}: ICardProps): JSX.Element => {
    return (
        <Box boxShadow="md" _hover={{boxShadow: 'xl'}} rounded="md" cursor="pointer" overflow="hidden">
            <Image
                src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1187&q=80"
                layout="responsive"
                width="305px"
                height="200px"
                priority
                className={styles.image}
            />
            <VStack spacing="15px" padding="20px" align="stretch">
                <Flex alignItems="center" color="#0067da" fontSize="18px" fontWeight="bold"
                      fontFamily="Nunita, sans-serif">
                    <Text mr={1}>12 000</Text>
                    <Text as="span">p</Text>
                </Flex>
                <VStack align="stretch" spacing="5px">
                    <Text fontSize="15px" color="#7e7e7e">Школа красоты</Text>
                    <Heading as="h5" fontSize="18px" fontWeight="600" color="#0a0a0a">Макияж для начинающих</Heading>
                </VStack>
                <Flex alignItems="center" color="#555555" fontSize="14px" paddingTop='15px'>
                    <HStack spacing={1} mr={3}>
                        <Icon width="1.1rem" height="1.1rem" as={BsPerson}/>
                        <Text>1538</Text>
                    </HStack>
                    <HStack spacing={1}>
                        <Icon width="1.1rem" height="1.1rem" as={BiCommentDetail}/>
                        <Text>1538</Text>
                    </HStack>
                </Flex>
            </VStack>
        </Box>
    )
}

export default Card
