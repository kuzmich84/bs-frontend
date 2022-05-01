export interface IMenuItem {
    name: string,
    url: string,
}

export interface IMainMenuProps {
    pages: IMenuItem[],
}
