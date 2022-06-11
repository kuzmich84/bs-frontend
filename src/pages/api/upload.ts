import multer from 'multer'
import multerS3 from 'multer-s3'
import nc from 'next-connect'
import * as uuid from 'uuid'
import type {NextApiRequest, NextApiResponse} from 'next'
import client from '../../lib/aws-config'


export const config = {
    api: {
        bodyParser: false,
    },
}

const upload = multer({
    storage: multerS3({
        s3: client,
        bucket: process.env.AWS_BUCKET_NAME!,
        acl: 'public-read',
        contentType: multerS3.AUTO_CONTENT_TYPE,
        metadata: function (req, file, cb) {
            cb(null, {fieldName: file.fieldname})
        },
        key: function (req, file, cb) {
            cb(null, `user_${req.body.userid}/${uuid.v4()}.jpg`)
        },
    }),

})

const handler = nc<NextApiRequest, NextApiResponse>()
    .use(upload.single('picture'))
    .post((req, res) => {
        return res.json({hello: 'file upload', url: req.file.location})
    })
    .patch(async (req, res) => {
        throw new Error('Throws me around! Error can be caught and handled.')
    })

export default handler

