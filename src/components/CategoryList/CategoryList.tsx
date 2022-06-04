import React from 'react'
import {ICategoryListProps} from './ICategoryList.props'
import {Button, List, ListItem} from '@chakra-ui/react'

const CategoryList = ({categories}: ICategoryListProps): JSX.Element => {
    return (
        <List display="flex" textAlign="center" mb='40px'>
            {categories.map((category) => (
                <ListItem key={category.id} mr="40px">
                    <Button colorScheme='green' variant="unstyled" fontFamily="Open Sans" fontSize="15px" color="#7d7d7d" fontWeight="100"
                            _hover={{color: '#221f1f'}}>{category.name}</Button>
                </ListItem>
            ))}
        </List>
    )
}

export default CategoryList
