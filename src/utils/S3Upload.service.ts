import { S3Client } from '@aws-sdk/client-s3'
import AWS from 'aws-sdk'
import multer from 'multer';
import multerS3 from 'multer-s3'

// const s3Client = new S3Client({
//     region: process.env.,
//     credentials: {
//         accessKeyId: process.env.AWS_ACCESS
//             secretAccesKey: process.env.AWS_SECRET as string
//     }
// })

// const storage = multerS3({
//     s3: s3Client,
//     bucket: process.env.ACCESS_TOKEN_EXPIRY as string,
//     acl: 'public-read',
//     contentType: multerS3.AUTO_CONTENT_TYPE,
//     metadata(req, file, cb) {
//         cb(null, { fieldname: file.fieldname });
//     },
//     key(req, file, cb) {
//         const fileName = `${Date.now()}_${file.fieldname}_${file.originalname}`;
//         cb(null, fileName);
//     },
// })

// const upload = multer({ storage: storage })

// AWS.config.update({
//     accessKeyId: process.env.AWS_ACCESS,
//     secretAccessKey: process.env.AWS_SECRET,
//     region: process.env.region,
// });


// const s3 = new AWS.S3();
// const deleteImageFromAws = (keyId: string) => {
//     const params = {
//         Bucket: process.env.s3BucketName,
//         Key: keyId,
//     };
//     s3.deleteObject(params, function (err, data) {
//         if (err) {
//             console.log(err);
//         } else {
//             console.log('Succesfully deleted', data);
//         }
//     });
// };