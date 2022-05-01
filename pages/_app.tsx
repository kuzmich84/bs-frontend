import '../styles/globals.css'
import type {AppProps} from 'next/app'
import {ChakraProvider} from '@chakra-ui/react'
import customTheme from '../customTheme'
import Layout from '../components/Layout/Layout'

function MyApp({Component, pageProps}: AppProps) {
    return (
        <ChakraProvider theme={customTheme}>
            <Layout/>
            <Component {...pageProps} />
        </ChakraProvider>
    )
}

export default MyApp
