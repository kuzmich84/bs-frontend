import React from 'react'
import {ISocialButtonProps} from './ISocialButton.props'
import {Button} from '@chakra-ui/react'
import hexRgb from 'hex-rgb'

const SocialButton = ({children, bg, ...props}: ISocialButtonProps): JSX.Element => {
    return (
        <Button
            height="50px"
            width="100%"
            lineHeight="1.2"
            border="1px"
            px="8px"
            borderRadius="4px"
            fontFamily="Nunito, sans-serif"
            fontSize="16px"
            fontWeight="medium"
            bg={bg}
            borderColor={bg}
            color="#fff"
            cursor="pointer"


            _hover={{
                opacity: 0.85,
            }}
            _active={{
                opacity: 1,
            }}
            _focus={{
                boxShadow:
                    `0 0 1px 2px ${hexRgb(bg, {format: 'css', alpha: 0.2})}, 0 1px 1px rgba(0, 0, 0, .15)`,
            }}


            {...props}
        >
            {children}
        </Button>
    )
}

export default SocialButton
