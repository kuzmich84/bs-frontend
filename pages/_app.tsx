import '../styles/globals.css'
import type {AppProps} from 'next/app'
import {ChakraProvider} from '@chakra-ui/react'
import customTheme from '../customTheme'
import Layout from '../components/Layout/Layout'

function MyApp({Component, pageProps}: AppProps) {
    console.log(customTheme)
    return (
        <ChakraProvider theme={customTheme}>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </ChakraProvider>
    )
}

export default MyApp
