import { Modal, ModalContent, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";

interface ModalContainerProps {
  isOpen: boolean,
  title: string,
  content: string,
  onConfirm: () => void,
  confirmText: string,
  onClose?: () => void,
  closeText?: string,
  redirectLink?: string,
  redirectText?: string,
}

const ModalContainer = ({ isOpen, title, content, onConfirm, confirmText, onClose, closeText, redirectLink, redirectText }: ModalContainerProps) => {

  return (
    <Modal isOpen={isOpen} hideCloseButton size="sm" className="text-content3-foreground">
      <ModalContent className="text-center">
        <ModalBody>
          <h1 className="text-lg font-semibold">{title}</h1>
          <p>
            {content}
          </p>
        </ModalBody>
        <ModalFooter className="flex justify-center">
          <Button color="primary" onClick={onConfirm} fullWidth>
            {confirmText}
          </Button>
          {redirectLink &&
            <Button color="secondary" fullWidth>
              <a href={redirectLink}>{redirectText}</a>
            </Button>
          }
          {closeText &&
            <Button className="bg-transparent border-2 border-gray-700" fullWidth onClick={onClose}>
              {closeText}
            </Button>
          }
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default ModalContainer