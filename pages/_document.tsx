import Document, {DocumentContext, Html, Head, Main, NextScript} from 'next/document'
import Footer from '../components/Layout/Footer/Footer'

class MyDocument extends Document {
    static async getInitialProps(ctx: DocumentContext) {
        const initialProps = await Document.getInitialProps(ctx)

        return initialProps
    }

    render() {
        return (
            <Html lang="ru">
                <Head>
                    <link
                        href="https://fonts.googleapis.com/css?family=Nunito:100,200,300,400,500,600,700|Open+Sans"
                        rel="stylesheet"
                    />
                </Head>
                <body>
                <Main/>
                <NextScript/>
                </body>
            </Html>
        )
    }
}

export default MyDocument