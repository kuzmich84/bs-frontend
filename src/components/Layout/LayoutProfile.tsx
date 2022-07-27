import React from 'react'
import {ILayoutProps} from './ILayout.props'
import MainMenu from './MainMenu/MainMenu'
import {pages} from '../../mock/pages'
import Footer from './Footer/Footer'

const LayoutProfile = ({children}: ILayoutProps): JSX.Element => {
    return (
        <>
            <>
                <MainMenu pages={pages}/>
            </>
            <main className="main">{children}</main>
            <Footer/>
        </>
    )
}

export default LayoutProfile
