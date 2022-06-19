import type {NextApiRequest, NextApiResponse} from 'next'
import {DeleteObjectCommand} from '@aws-sdk/client-s3'
import client from '../../lib/aws-config'

type Data = {
    message: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    if (req.method === 'DELETE') {
        const {url} = req.query
        console.log(url.slice(1))

        const bucketParams = {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: url.slice(1),
        }

        try {
            await client.send(
                new DeleteObjectCommand({Bucket: bucketParams.Bucket, Key: bucketParams.Key}),
            )
            return res.status(200).json({message: 'Avatar deleted'})
        } catch (err) {
            console.log('Error deleting object', err)
        }
    }

    res.status(404).json({message: 'Unavailable'})

}
