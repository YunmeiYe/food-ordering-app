import { ChangeEvent } from "react";
import toast from "react-hot-toast";

interface ImageUploaderProps {
  setImageLink: (imageLink: string) => void;
  children?: React.ReactNode
}

const ImageUploader = ({ setImageLink, children }: ImageUploaderProps) => {
  
  async function handleFileChange(event: ChangeEvent<HTMLInputElement>): Promise<void> {
    const files = event.target.files;
    if (files && files.length === 1) {
      const formData = new FormData;
      formData.set('file', files[0]);

      const uploadPromise = new Promise<string | undefined>(async (resolve, reject) => {
        await fetch('/api/upload', {
          method: 'POST',
          body: formData
        }).then(response => {
          if (response.ok) {
            response.json().then(link => { setImageLink(link), resolve(link) });
          } else {
            reject();
          }
        });
      })

      toast.promise(uploadPromise, {
        loading: "Uploading...",
        success: "Upload success",
        error: "Upload failed",
      })
    }
  }

  return (
    <label className="cursor-pointer">
      <input type="file" accept="image/*" onChange={handleFileChange} hidden />
      {children && children}
    </label>
  )
}

export default ImageUploader