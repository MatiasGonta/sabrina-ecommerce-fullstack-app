import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import { useSignupMutation } from "@/hooks";
import { ApiError } from "@/models";
import { getError, handleFormInputChange } from "@/utilities";
import { useState } from "react";
import { toast } from "react-toastify";
import { Tooltip } from '@mui/material';

interface CreateUserModal { }

const CreateUserModal: React.FC<CreateUserModal> = () => {
    const [openModal, setOpenModal] = useState<boolean>(false);

    //Form inputs values
    const [formData, setFormData] = useState<{
        name: string,
        email: string,
        password: string,
        confirmPassword: string,
        isAdmin: boolean,
        verify: boolean
    }>({ name: '', email: '', password: '', confirmPassword: '', isAdmin: false, verify: false });

    const [showPassword, setShowPassword] = useState<boolean>(false);

    const { mutateAsync: signup } = useSignupMutation();

    const submitHandler = async (e: React.SyntheticEvent) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            toast.error('Las contraseñas no son iguales');
            return;
        }

        try {
            await toast.promise(signup(formData), {
                pending: {
                    render() {
                        return 'Creando nuevo usuario...'
                    },
                },
                success: {
                    render() {
                        return 'Usuario creado correctamente'
                    },
                },
            });
            setOpenModal(false)
            toast.success('Usuario creado correctamente');
        } catch (error) {
            toast.error(getError(error as ApiError));
        }
    }

    return (
        <>
            <button className="usersboard__users__header__btn" onClick={() => setOpenModal(true)}>
                <AddIcon sx={{ fontSize: 25 }} />
                <span>Crear usuario</span>
            </button>
            {openModal && (
                <>
                    <div className="create-user-close-modal" onClick={() => setOpenModal(false)}></div>

                    <div className="create-user-md">
                        <Tooltip title="Cerrar">
                            <div className="create-user-md__close" onClick={() => setOpenModal(false)}>
                                <CloseIcon sx={{ fontSize: 30 }} />
                            </div>
                        </Tooltip>
                        <div className="form-container">
                            <h3>Crear Usuario</h3>
                            <form onSubmit={submitHandler}>
                                <div className="group">
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        pattern=".{4,25}"
                                        title="El nombre debe tener entre 4 y 25 caracteres"
                                        className={formData.name !== '' ? 'active' : ''}
                                        required
                                        onChange={(e) => handleFormInputChange(e, formData, setFormData)}
                                    />
                                    <span className="highlight"></span>
                                    <span className="bar"></span>
                                    <label htmlFor="name">Name</label>
                                </div>
                                <div className="group">
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        className={formData.email !== '' ? 'active' : ''}
                                        required
                                        onChange={(e) => handleFormInputChange(e, formData, setFormData)}
                                    />
                                    <span className="highlight"></span>
                                    <span className="bar"></span>
                                    <label htmlFor="email">Correo electrónico</label>
                                </div>
                                <div className="group">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        value={formData.password}
                                        required
                                        onChange={(e) => handleFormInputChange(e, formData, setFormData)}
                                    />
                                    <button type="button" onClick={() => setShowPassword(!showPassword)}>
                                        {
                                            showPassword
                                                ? <VisibilityIcon sx={{ fontSize: 25 }} />
                                                : <VisibilityOffIcon sx={{ fontSize: 25 }} />
                                        }
                                    </button>
                                    <span className="highlight"></span>
                                    <span className="bar"></span>
                                    <label htmlFor="password">Contraseña</label>
                                </div>
                                <div className="group">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        required
                                        onChange={(e) => handleFormInputChange(e, formData, setFormData)}
                                    />
                                    <button type="button" onClick={() => setShowPassword(!showPassword)}>
                                        {
                                            showPassword
                                                ? <VisibilityIcon sx={{ fontSize: 25 }} />
                                                : <VisibilityOffIcon sx={{ fontSize: 25 }} />
                                        }
                                    </button>
                                    <span className="highlight"></span>
                                    <span className="bar"></span>
                                    <label htmlFor="confirmPassword">Confirmar Contraseña</label>
                                </div>
                                <div className="checkbox-container">
                                    <div className="checkbox">
                                        <label className="checkbox-wrapper">
                                            <input
                                                type="checkbox"
                                                name="isAdmin"
                                                className="checkbox-input"
                                                onChange={(e) => setFormData({ ...formData, isAdmin: e.target.checked })}
                                            />
                                            <span className={formData.isAdmin ? "checkbox-tile checked" : "checkbox-tile"}>
                                                <span className="checkbox-icon">
                                                    <AdminPanelSettingsOutlinedIcon sx={{ fontSize: 25 }} />
                                                </span>
                                                <span className="checkbox-label">Admin</span>
                                            </span>
                                        </label>
                                    </div>
                                    <div className="checkbox">
                                        <label className="checkbox-wrapper">
                                            <input
                                                type="checkbox"
                                                name="verify"
                                                className="checkbox-input"
                                                onChange={(e) => setFormData({ ...formData, verify: e.target.checked })}
                                            />
                                            <span className={formData.verify ? "checkbox-tile checked" : "checkbox-tile"}>
                                                <span className="checkbox-icon">
                                                    <BadgeOutlinedIcon sx={{ fontSize: 25 }} />
                                                </span>
                                                <span className="checkbox-label">Verificado</span>
                                            </span>
                                        </label>
                                    </div>
                                </div>
                                <div className="form-submit">
                                    <button type="submit">Crear usuario</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </>
            )}
        </>
    )
}

export default CreateUserModal