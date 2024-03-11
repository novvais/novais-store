import { s3 } from "./Connection/aws";

const upload = async (patch, buffer: Buffer, mimetype: string) => {
  console.log(patch)

  const arquivo = await s3
    .upload({
      Bucket: process.env.BUCKET,
      Key: patch,
      Body: buffer,
      ContentType: mimetype,
    })
    .promise();

  return {
    url: arquivo.Location,
    path: arquivo.Key,
  };
};

export { upload };
