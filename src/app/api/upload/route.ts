import cloudinary from 'cloudinary';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRECT,
    secure: true
  });

  const data = await req.formData();

  if (data.get('file')) {
    const file = data.get('file') as File;
    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);

    const uploadResult: any = await new Promise((resolve, reject) => {
      cloudinary.v2.uploader.upload_stream({}, function (error, result) {
        if (error) {
          reject(error);
          return;
        }
        resolve(result)
      }).end(buffer);
    })

    return NextResponse.json(uploadResult.secure_url)
  }
}