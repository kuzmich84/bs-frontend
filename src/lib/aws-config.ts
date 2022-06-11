import {S3Client} from '@aws-sdk/client-s3'

const client = new S3Client({
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_ACCESS_SECRET!,
    },
    endpoint: process.env.AWX_ENDPOINT,
    region: process.env.AWS_REGION,
    apiVersion: 'latest',
})

export default client