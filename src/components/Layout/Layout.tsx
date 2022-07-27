import React from 'react'
import {ILayoutProps} from './ILayout.props'
import HeaderTop from './HeaderTop/HeaderTop'
import MainMenu from './MainMenu/MainMenu'
import {pages} from '../../mock/pages'
import Footer from './Footer/Footer'
import {Container} from "@chakra-ui/react";

const Layout = ({children}: ILayoutProps): JSX.Element => {
    return (
        <>
            <>
                <HeaderTop/>
                <Container maxWidth={{base: '960px', xl: 'container.xl'}}>
                    <MainMenu pages={pages}/>
                </Container>
            </>
            <main className="main">{children}</main>
            <Footer/>
        </>
    )
}

export default Layout
