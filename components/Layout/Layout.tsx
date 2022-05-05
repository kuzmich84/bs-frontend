import React from 'react'
import {ILayoutProps} from './ILayout.props'
import HeaderTop from './HeaderTop/HeaderTop'
import MainMenu from './MainMenu/MainMenu'
import {pages} from '../../mock/pages'
import {useTheme} from '@chakra-ui/react'
import Footer from './Footer/Footer'

const Layout = ({children}: ILayoutProps): JSX.Element => {
    // const theme = useTheme()
    // console.log(theme)
    return (
        <>
            <>
                <HeaderTop/>
                <MainMenu pages={pages}/>
            </>
            <main className="main">{children}</main>
            <Footer/>
        </>
    )
}

export default Layout
