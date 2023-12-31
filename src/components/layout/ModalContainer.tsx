import { Modal, ModalContent, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";

interface ModalContainerProps {
  isOpen: boolean,
  title: string,
  content: string,
  redirectLink?: string,
  onConfirm: () => void;
}

const ModalContainer = ({ isOpen, title, content, redirectLink, onConfirm }: ModalContainerProps) => {
  const { onOpenChange } = useDisclosure();

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} hideCloseButton size="sm" className="text-content3-foreground">
      <ModalContent className="text-center">
        {(onClose) => (
          <>
            <ModalBody>
              <h1 className="text-lg font-semibold">{title}</h1>
              <p>
                {content}
              </p>
            </ModalBody>
            <ModalFooter className="flex justify-center">
              <Button color="primary" onPress={onClose} onClick={onConfirm} fullWidth>
                OK
              </Button>
              {redirectLink ? (
                <Button color="secondary" fullWidth>
                  <a href={redirectLink}>Login</a>
                </Button>
              ) : null}
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}

export default ModalContainer