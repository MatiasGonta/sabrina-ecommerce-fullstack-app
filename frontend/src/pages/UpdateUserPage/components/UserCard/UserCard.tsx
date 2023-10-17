import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { TypeWithKey, User } from "@/models";

interface UserCardInterface {
    references: TypeWithKey<React.MutableRefObject<HTMLInputElement | null>>;
    data: User;
}

const UserCard: React.FC<UserCardInterface> = ({ references, data }) => {
    
    const handleFocus = (key: keyof TypeWithKey<React.MutableRefObject<null>>) => {
        const reference = references[key];

        if (reference && reference.current) {
          reference.current.focus();
        }
    };

  return (
        <div className="user-card">
            <div className="user-card__icon">
                <AccountCircleOutlinedIcon sx={{ fontSize: 75 }} />
            </div>
            <div className="user-card__main-info">
                <ul>
                    <li>
                        <span onClick={() => handleFocus('name')}>
                            <strong>Nombre: </strong>
                            {data.name}
                        </span>
                    </li>
                    <li>
                        <span onClick={() => handleFocus('email')}>
                            <strong>Email: </strong>
                            {data.email}
                        </span>
                    </li>
                    <li>
                        <span onClick={() => handleFocus('verify')}>
                            <strong>Verificado: </strong>
                            {data.verify ? 'Si' : 'No'}
                        </span>
                    </li>
                    <li>
                        <span onClick={() => handleFocus('admin')}>
                            <strong>Admin: </strong>
                            {data.isAdmin ? 'Si' : 'No'}
                        </span>
                    </li>
                </ul>
            </div>
            <div className="user-card__details">
                <ul>
                    <li>
                        <span>
                            <strong>Id: </strong>
                            {data._id}
                        </span>
                    </li>
                    <li>
                        <span>
                            <strong>Fecha de creación: </strong>
                            {data.createdAt.substring(0,10) + ' ' + data.createdAt.substring(11,19)}
                        </span>
                    </li>
                    <li>
                        <span>
                            <strong>Última actualización: </strong>
                            {data.updatedAt.substring(0,10) + ' ' + data.updatedAt.substring(11,19)}
                        </span>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default UserCard