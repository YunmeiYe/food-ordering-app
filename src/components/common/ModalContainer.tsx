import { Modal, ModalContent, ModalBody, ModalFooter, Button} from "@nextui-org/react";

interface ModalContainerProps {
  isOpen: boolean,
  title: string,
  content: string,
  onConfirm: () => void,
  confirmText: string,
  onClose?: () => void,
  closeText?: string,
}

const ModalContainer = ({ isOpen, title, content, onConfirm, confirmText, onClose, closeText}: ModalContainerProps) => {

  return (
    <Modal isOpen={isOpen} hideCloseButton size="md" backdrop="blur" className="text-content3-foreground">
      <ModalContent className="text-center p-6">
        <ModalBody>
          <h3 className="font-semibold">{title}</h3>
          <p>
            {content}
          </p>
        </ModalBody>
        <ModalFooter className="flex justify-center gap-4">
          <Button className="bg-white text-dark border" onClick={onConfirm} fullWidth>
            {confirmText}
          </Button>
          {closeText &&
            <Button color="primary" className="text-dark" fullWidth onClick={onClose}>
              {closeText}
            </Button>
          }
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default ModalContainer