import {IMainMenuProps, IMenuItem} from '../components/Layout/MainMenu/IMainMenu.props'

export interface IModal {
    isOpen: boolean,
    onClose: () => void,
}

export interface IDrawer extends IModal {
    btnRef: any,
    pages: IMenuItem[],
}