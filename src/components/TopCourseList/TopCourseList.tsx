import React from 'react'
import {ITopCourseListProps} from './ITopCourseList.props'
import {Center, Container, Heading, SimpleGrid} from '@chakra-ui/react'
import CategoryList from '../CategoryList/CategoryList'
import {categories} from '../../mock/categories'

import Card from '../Card/Card'


const TopCourseList = ({...props}: ITopCourseListProps): JSX.Element => {
    return (
        <Container maxWidth="1320px" mt="30px">
            <Heading as="h3" fontSize="26px" textAlign="center" mb="30px">Популярные Курсы</Heading>
            <Center>
                <CategoryList categories={categories}/>
            </Center>
            <SimpleGrid columns={{base: 1, md: 2, lg: 3, xl: 4}} spacing="30px">
                <Card/>
                <Card/>
                <Card/>
                <Card/>
                <Card/>
                <Card/>

            </SimpleGrid>

        </Container>
    )
}

export default TopCourseList
