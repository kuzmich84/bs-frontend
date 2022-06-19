import React from 'react'
import {ITextareaThemeProps} from './ITextareaTheme.props'
import {forwardRef, Textarea, TextareaProps} from '@chakra-ui/react'


const TextareaTheme = forwardRef<TextareaProps & ITextareaThemeProps, 'textarea'>(({ isValid, ...props}, ref): JSX.Element => {
    return (
        <Textarea
            borderWidth={isValid ? '2px' : '1px'}
            borderColor={isValid ? 'green.500' : 'rgb(221, 221, 221)'}
            borderRadius="5px"
            fontSize="14px"
            fontFamily="Nunito"
            padding="0 20px"
            height="50px"
            bg="#fff"
            p={2}
            _focus={{
                boxShadow: `0px 1px 4px 0px rgb(0 0 0 / 9%)`,
            }}
            ref={ref}
            {...props}
        />
    )
})

export default TextareaTheme
