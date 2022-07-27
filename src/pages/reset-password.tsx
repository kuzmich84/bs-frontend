import ResetPasswordForm from '../components/Forms/ResetPasswordForm/ResetPasswordForm'
import {Box, Container, Flex} from '@chakra-ui/react'
import {useRouter} from 'next/router'
import {GetServerSideProps} from 'next'
import {getSession} from 'next-auth/react'
import {AppRoute} from '../interfaces/const'
import Layout from "../components/Layout/Layout";

const ResetPassword = (): JSX.Element => {
    const router = useRouter()
    const {code} = router.query !== undefined ? router.query : ''

    return (
        <Box as="section" bg={'gray.50'}>
            <Container maxWidth="1200px">
                <Flex
                    minH={'68vh'}
                    align={'center'}
                    justify={'center'}
                >
                    <ResetPasswordForm privateCode={code}/>
                </Flex>
            </Container>
        </Box>

    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const session = await getSession({req: context.req})
    if (session) {
        return {
            redirect: {
                destination: AppRoute.Root,
                permanent: false,
            },
        }
    }

    return {
        props: {session},
    }

}
ResetPassword.layout = Layout
export default ResetPassword