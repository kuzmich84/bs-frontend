import ResetPasswordForm from '../components/Forms/ResetPasswordForm/ResetPasswordForm'
import {Box, Container, Flex, Heading, Text, VStack} from '@chakra-ui/react'
import {useRouter} from 'next/router'
import {GetServerSideProps} from 'next'
import {getSession} from 'next-auth/react'
import {AppRoute} from '../interfaces/const'

const ResetPassword = (): JSX.Element => {
    const router = useRouter()
    const {code} = router.query

    return (
        <Box as="section" bg={'gray.50'}>
            <Container maxWidth="1200px">
                <Flex
                    minH={'90vh'}
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

export default ResetPassword