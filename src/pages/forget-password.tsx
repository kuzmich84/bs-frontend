import EmailForm from '../components/Forms/EmailForm/EmailForm'
import {Container, Heading, VStack, Text, Box, useColorModeValue, Flex} from '@chakra-ui/react'
import {GetServerSideProps} from 'next'
import {getSession} from 'next-auth/react'
import {AppRoute} from '../interfaces/const'

const forgetPassword = (): JSX.Element => {
    return (
        <Box as="section" bg={'gray.50'}>
            <Container maxWidth="1200px">
                <Flex
                    minH={'90vh'}
                    align={'center'}
                    justify={'center'}
                >
                    <EmailForm/>

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
export default forgetPassword



