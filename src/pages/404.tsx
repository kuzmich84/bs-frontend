import Link from 'next/link'
import {AppRoute} from '../interfaces/const'
import {Container, Heading} from '@chakra-ui/react'
import Layout from "../components/Layout/Layout";

const NotFoundPage = (): JSX.Element => {
    return (
        <Container>
            <Heading variant="h1" size='lg' mb={10}>404 Not found Page</Heading>
            <Link href={AppRoute.Root}>Перейти на главную страницу</Link>
        </Container>

    )
}

NotFoundPage.layout = Layout
export default NotFoundPage