import * as uuid from 'uuid'
import {S3Client, AbortMultipartUploadCommand, CreateBucketCommand, PutObjectCommand} from '@aws-sdk/client-s3'
import path from 'path'
import {NextApiRequest, NextApiResponse} from 'next'
import formidable from 'formidable'
import * as fs from 'fs'

export const config = {
    api: {
        bodyParser: false,
    },
}

const client = new S3Client({
    credentials: {
        accessKeyId: '201867_Dmitry',
        secretAccessKey: 'Kudim1984!',
    },
    endpoint: 'https://s3.storage.selcloud.ru',
    region: 'ru-1',
    apiVersion: 'latest',
})


const params = {
    Bucket: 'bs-data',
}


const saveFile = async (file) => {
    try {
        const image = fs.readFileSync(file.filepath)
        const fileName = file.newFilename
        fs.writeFileSync(path.resolve('public', fileName + '.jpg'), image)
        await fs.unlinkSync(file.filepath)

        const data = await client.send(new PutObjectCommand({...params, Key: `test/${fileName}`, Body: fs.createReadStream(file.filepath)}))

        // const filePath = path.resolve('public', fileName)
        // console.log(fileName)
        // await file.mv(filePath)
        console.log(data)
        return
    } catch (e) {
        console.error(e)
    }
}

export default async function upload(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        // const form = formidable({ multiples: true });
        //
        // form.parse(req, async (err, fields, files) => {
        //     if (err) {
        //         res.writeHead(err.httpCode || 400, { 'Content-Type': 'text/plain' });
        //         res.end(String(err));
        //         return;
        //     }
        //     console.log(files.picture)
        //      await saveFile(files.picture)
        //
        // });
        console.log(req)

        return res.status(200).json({message: 'upload'})
    }

    // form.parse(req, (err, fields, files) => {
    //     if (err) {
    //         res.writeHead(err.httpCode || 400, { 'Content-Type': 'text/plain' });
    //         res.end(String(err));
    //         return;
    //     }
    //     res.writeHead(200, { 'Content-Type': 'application/json' });
    //     res.end(JSON.stringify({ fields, files }, null, 2));
    // });
    //
    // return;


    return res.status(403).send('Forbidden method')
}

