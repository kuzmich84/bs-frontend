import React from 'react'
import {ChakraProps} from '@chakra-ui/react'

export interface IThemeButtonProps extends ChakraProps {
    children: React.ReactNode,
    color: string,
    bg: string,
}
