import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

if (!import.meta.env?.VITE_AWS_ACCESS_KEY_ID || !import.meta.env?.VITE_AWS_SECRET_ACCESS_KEY) {
  console.error('Error: AWS credentials are not set!');
}

const s3Client = new S3Client({
  region: 'us-east-2',
  credentials: {
    accessKeyId: import.meta.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: import.meta.env.AWS_SECRET_ACCESS_KEY,
  },
});


export { s3Client, PutObjectCommand };