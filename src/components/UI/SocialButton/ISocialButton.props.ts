import {ButtonProps, ChakraProps} from '@chakra-ui/react'
import React from 'react'

export interface ISocialButtonProps extends ButtonProps {
    children: React.ReactNode,
    bg: string,
}

