import '../styles/globals.css'
import type {AppProps} from 'next/app'
import {ChakraProvider} from '@chakra-ui/react'
import customTheme from '../../customTheme'
import Layout from '../components/Layout/Layout'
import LayoutProfile from "../components/Layout/LayoutProfile";


import {SessionProvider} from 'next-auth/react'
import type {NextPage} from "next";
import {ReactElement} from "react";


export type PageWithMainLayoutType = NextPage & { layout: typeof Layout }
export type PageWithAdminLayoutType = NextPage & { layout: typeof LayoutProfile }

export type PageWithLayoutType =
    | PageWithMainLayoutType
    | PageWithAdminLayoutType

type AppLayoutProps = AppProps & {
    Component: PageWithLayoutType
    pageProps: any
}

function MyApp({Component, pageProps}: AppLayoutProps) {
    const Layout =
        Component.layout || ((children: ReactElement) => <>{children}</>)
    return (
        <SessionProvider session={pageProps.session}>
            <ChakraProvider theme={customTheme}>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </ChakraProvider>
        </SessionProvider>
    )
}

export default MyApp
