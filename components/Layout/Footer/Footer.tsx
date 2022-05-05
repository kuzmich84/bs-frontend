import React from 'react'
import {IFooterProps} from './IFooter.props'
import styles from './Footer.module.scss'

const Footer = ({...props}: IFooterProps): JSX.Element => {
    return (
        <div className="footer">Footer</div>
    )
}

export default Footer
