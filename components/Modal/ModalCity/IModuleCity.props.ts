import React from 'react'

export interface IModuleCityProps {
    isOpen: boolean,
    onClose: () => void,
    cities: string[],
    onButtonClick: (evt: React.MouseEvent) => void,
}
