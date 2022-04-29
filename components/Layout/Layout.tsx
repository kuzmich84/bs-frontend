import React from 'react'
import {ILayoutProps} from './ILayout.props'
import styles from './Layout.module.scss'
import HeaderTop from './HeaderTop/HeaderTop'

const Layout = ({...props}: ILayoutProps): JSX.Element => {
    return (
        <HeaderTop/>
    )
}

export default Layout
