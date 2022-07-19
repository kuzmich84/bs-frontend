import {ISession, IUser} from "../../Forms/AvatarForm/IAvatarForm.props";

export interface IModalAvatarProps {
    user: IUser,
    session: ISession,
    isModalOpen: boolean,
    onClose: () => void,

}
