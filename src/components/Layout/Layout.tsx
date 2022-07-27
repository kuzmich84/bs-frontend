import React from 'react'
import {ILayoutProps} from './ILayout.props'
import HeaderTop from './HeaderTop/HeaderTop'
import MainMenu from './MainMenu/MainMenu'
import {pages} from '../../mock/pages'
import Footer from './Footer/Footer'

const Layout = ({children}: ILayoutProps): JSX.Element => {
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
