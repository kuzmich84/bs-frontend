import React from 'react'
import {ILayoutProps} from './ILayout.props'
import styles from './Layout.module.scss'
import HeaderTop from './HeaderTop/HeaderTop'
import MainMenu from './MainMenu/MainMenu'
import {pages} from '../../mock/pages'

const Layout = ({...props}: ILayoutProps): JSX.Element => {
    return (
        <>
            <HeaderTop />
            <MainMenu pages={pages}/>
        </>
    )
}

export default Layout
