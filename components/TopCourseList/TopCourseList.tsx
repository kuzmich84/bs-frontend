import React from 'react'
import {ITopCourseListProps} from './ITopCourseList.props'
import styles from './TopCourseList.module.scss'
import {Box, Center, Container, Heading, List, SimpleGrid, VStack} from '@chakra-ui/react'
import CategoryList from '../CategoryList/CategoryList'
import {categories} from '../../mock/categories'
import Image from 'next/image'

const TopCourseList = ({...props}: ITopCourseListProps): JSX.Element => {
    return (
        <Container maxWidth="1320px" mt='30px'>
            <Heading as="h3" fontSize="26px" textAlign="center" mb="30px">Популярные Курсы</Heading>
            <Center>
                <CategoryList categories={categories}/>
            </Center>
            <SimpleGrid  columns={{base: 1, md: 2, lg: 3, xl:4}} spacing='20px'>
                <Box  height='80px' boxShadow='md' _hover={{boxShadow: 'xl'}} rounded='md' cursor='pointer'>
                    <Heading>Card</Heading>

                </Box>
                <Box bg='tomato' height='80px'/>
                <Box bg='tomato' height='80px'/>
                <Box bg='tomato' height='80px'/>
                <Box bg='tomato' height='80px'/>
                <Box bg='tomato' height='80px'/>
            </SimpleGrid>

        </Container>
    )
}

export default TopCourseList
