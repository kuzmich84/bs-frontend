import React from 'react'
import {ILayoutProps} from './ILayout.props'
import MainMenu from './MainMenu/MainMenu'
import {pages} from '../../mock/pages'
import Footer from './Footer/Footer'
import {Container} from "@chakra-ui/react";

const LayoutProfile = ({children}: ILayoutProps): JSX.Element => {
    return (
        <>
            <Container width="100%" maxWidth="100%" pr={15} pl={15} >
                <MainMenu pages={pages} profile={true}/>
            </Container>
            <main className="main">{children}</main>
            <Footer/>
        </>
    )
}

export default LayoutProfile
