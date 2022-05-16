import {getSession} from 'next-auth/react'
import {GetServerSideProps} from 'next'

const Profiles = (): JSX.Element => {

    return (
        <div>Page Profiles</div>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const session = await getSession({req: context.req})
    if (!session) {
        return {
            redirect: {
                destination: '/login',
                permanent: false,
            },
        }
    }

    return {
        props: {session},
    }
}
export default Profiles