import {IInputProps} from './IInput.props'
import {forwardRef, Input, InputProps} from '@chakra-ui/react'

const InputTheme = forwardRef<InputProps & IInputProps, 'input'>(({isValid, ...props}, ref): JSX.Element => {
    return (
        <Input
            borderWidth={isValid ? '2px' : '1px'}
            borderColor={isValid ? 'green.500' : 'rgb(221, 221, 221)'}
            borderRadius="5px"
            fontSize="14px"
            fontFamily="Nunito"
            padding="0 20px"
            height="50px"
            bg="#fff"
            _focus={{
                boxShadow: `0px 1px 4px 0px rgb(0 0 0 / 9%)`,
            }}
            ref={ref}
            {...props}
        />
    )
})

export default InputTheme
