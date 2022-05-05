import React from 'react'
import {
    List,
    ListItem,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Button, Divider,
} from '@chakra-ui/react'
import {IModuleCityProps} from './IModuleCity.props'


const ModalCity = ({isOpen, onClose, cities, onButtonClick}: IModuleCityProps): JSX.Element => {

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay>
                <ModalContent>
                    <ModalHeader fontFamily="Nunito">Выбор города</ModalHeader>
                    <Divider/>
                    <ModalCloseButton/>
                    <ModalBody>
                        <List>
                            {cities.map((city) => (
                                <ListItem key={city} onClick={onClose} m={2}>
                                    <Button onClick={onButtonClick} variant="link" sx={{
                                        fontSize: '14px',
                                        fontFamily: 'Nunito',
                                        color: 'gray.600',
                                    }}>{city}</Button>
                                </ListItem>
                            ))}
                        </List>
                    </ModalBody>
                </ModalContent>
            </ModalOverlay>
        </Modal>
    )
}

export default ModalCity