import React from 'react'
import {IThemeButtonProps} from './IThemeButton.props'
import {Box, Button} from '@chakra-ui/react'
import hexRgb from 'hex-rgb'

const ThemeButton = ({children, color, bg, ...props}: IThemeButtonProps): JSX.Element => {
    return (
        <Button
            as="button"
            height="55px"
            width="100%"
            lineHeight="1.2"
            transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
            border="1px"
            px="8px"
            borderRadius="4px"
            fontFamily="Nunito"
            fontSize="19px"
            fontWeight="bold"
            bg={bg}
            borderColor={bg}
            color={color}
            cursor="pointer"

            _hover={{
                bg: '#ffffff',
                color: '#192675',
            }}
            _active={{
                bg: '#ffffff',
                color: '#192675',
                transform: 'scale(0.98)',
            }}
            _focus={{
                boxShadow:
                    `0 0 1px 2px ${hexRgb(bg, {format: 'css', alpha: 0.2})}, 0 1px 1px rgba(0, 0, 0, 0)`,
                outline: `1px auto ${bg}`
            }}
            {...props}
        >
            {children}
        </Button>
    )
}

export default ThemeButton
