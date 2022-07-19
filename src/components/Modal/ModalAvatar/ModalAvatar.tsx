import {IModalAvatarProps} from './IModalAvatar.props'
import {
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
} from "@chakra-ui/react";
import AvatarForm from "../../Forms/AvatarForm/AvatarForm";

function ModalAvatar({user, session, isModalOpen, onClose}: IModalAvatarProps): JSX.Element {

    return (
        <>
            <Modal
                isOpen={isModalOpen}
                onClose={onClose}
            >
                <ModalOverlay/>
                <ModalContent>
                    <ModalHeader>Загрузите фото</ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody pb={6}>
                        <AvatarForm user={user} session={session}/>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}

export default ModalAvatar
