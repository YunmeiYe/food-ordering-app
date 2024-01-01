import { TickIcon } from "@/icons/TickIcon";
import { Button, Modal, ModalBody, ModalContent, ModalFooter, useDisclosure } from "@nextui-org/react";
import { ChangeEvent, useState } from "react";

interface FileUploadModalProps {
  isOpen: boolean,
  onConfirm: () => void;
  onUpdate: (imageLink: string) => void;
}

const FileUploadModal = ({ isOpen, onConfirm, onUpdate }: FileUploadModalProps) => {
  const { onOpenChange } = useDisclosure();
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [imageUploaded, setImageUploaded] = useState(false);
  const [imageLink, setImageLink] = useState('');

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const files = event.target.files;

    if (files && files.length === 1) {
      const selectedFile = files[0];
      setFile(selectedFile);
    }
  };

  async function handleFileUpload() {
    setUploading(true)
    if (file) {
      const formData = new FormData;
      formData.set('file', file);
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      });
      if (response.ok) {
        const responseData = await response.json();
        setImageUploaded(true);
        setImageLink(responseData);
      }
    }
    setUploading(false);
  }

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} hideCloseButton size="xs">
      <ModalContent className="text-center">
        {(onClose) => (
          <>
            <ModalBody className="block">
              <h1 className="text-lg font-semibold mb-8">Upload Image File</h1>
              <label className="my-3">
                <input type="file" accept="image/*" onChange={handleFileChange} hidden disabled={uploading} />
                <span className={`rounded-lg p-2 text-center text-white bg-secondary ${uploading ? "bg-blue-200 cursor-not-allowed" : "cursor-pointer"}`} hidden={imageUploaded}>Choose File</span>
                {file && (
                  <p className="mt-2" hidden={imageUploaded}>{file.name}</p>
                )}
              </label>
              <div className={`text-center items-center mt-2 ${imageUploaded ? "flex flex-col" : "hidden"}`}>
                <TickIcon className={"w-[80px]"} />
                Image upload success
              </div>
            </ModalBody>
            <ModalFooter className="flex justify-center">
              <>
                {imageUploaded ? (
                  <Button color="primary" onPress={onClose} onClick={() => { onUpdate(imageLink), onConfirm() }}>
                    OK
                  </Button>
                ) : (
                  <Button color="danger" variant="flat" onPress={onClose} onClick={() => { onConfirm(); setFile(null); }}>
                    Cancel
                  </Button>
                )}
                <Button type="submit" color="primary" isLoading={uploading} onClick={handleFileUpload} className={imageUploaded ? "hidden" : ""}>
                  {uploading ? "Uploading" : "Upload"}
                </Button>
              </>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}

export default FileUploadModal