import React from 'react'
import {ButtonProps} from '@chakra-ui/react'
export interface IThemeButtonProps extends ButtonProps {
    children: React.ReactNode,
    color: string,
    bg: string,
}
