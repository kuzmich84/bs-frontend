import React from 'react'
import {
    Button,
    Divider, Input, InputGroup, InputLeftElement, InputRightElement,
    List, ListItem,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
} from '@chakra-ui/react'
import {IModalSearch} from './IModalSearch'
import {SearchIcon} from '@chakra-ui/icons'

const ModalSearch = ({isOpen, onClose}: IModalSearch): JSX.Element => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay>
                <ModalContent>
                    <InputGroup>
                        <Input placeholder='Поиск' />
                        <InputRightElement children={<SearchIcon />} />
                    </InputGroup>
                </ModalContent>
            </ModalOverlay>
        </Modal>
    )
}

export default ModalSearch