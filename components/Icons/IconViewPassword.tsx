import {IconButton} from '@chakra-ui/react'
import {ViewIcon, ViewOffIcon} from '@chakra-ui/icons'

export interface IIconViewPassword {
    isShow: boolean,
    handleClick: () => void
}

const IconViewPassword = ({isShow, handleClick}: IIconViewPassword): JSX.Element => {

    return (
        <IconButton
            onClick={handleClick}
            variant="unstyled"
            sx={{_focus: {outline: 'none'}, color: 'gray.500'}}
            icon={isShow ? <ViewIcon/> : <ViewOffIcon/>}
            aria-label="Показать пароль"/>

    )
}

export default IconViewPassword