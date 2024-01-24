import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { ApiError, Routes, TypeWithKey } from "@/models";
import { getError, handleFormInputChange } from "@/utilities";
import { useNavigate, useLocation } from "react-router-dom";
import { useRestorePasswordMutation } from "@/hooks";
import { Helmet } from "react-helmet-async";
import { toast } from "react-toastify";
import { useState } from "react";
import '@/styles/pages/RestorePassword/RestorePassword.scss';

interface RestorePasswordInterface { }

const RestorePassword: React.FC<RestorePasswordInterface> = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    const emailToken = queryParams.get('emailToken');

    const { mutateAsync: restorePassword } = useRestorePasswordMutation();

    const [formData, setFormData] = useState<TypeWithKey<string>>({ newPassword: '', confirmNewPassword: '' });

    const [showNewPassword, setShowNewPassword] = useState<boolean>(false);

    const submitHandler = async (e: React.SyntheticEvent) => {
        e.preventDefault();

        if (formData.newPassword !== formData.confirmNewPassword) return;

        try {
            await toast.promise(restorePassword({ token: emailToken!, newPassword: formData.newPassword }), {
                pending: {
                    render() {
                        return 'Buscando su usuario... Por favor, espera un momento.'
                    },
                },
                success: {
                    render({ data }) {
                        return data?.message
                    }
                }
            });

            setTimeout(() => navigate(Routes.SIGNIN), 3250);
        } catch (error) {
            toast.error(getError(error as ApiError));
        }
    }

    return (
        <main className="main--restore-password">
            <Helmet>
                <title>Restablecer contraseña</title>
            </Helmet>
            <section>
                <article>
                    <div className="restore-password-md">
                        <div className="restore-password-md__header">
                            <h3 className="restore-password-md__header__title">Restablecer contraseña</h3>
                            <p className="restore-password-md__header__text">Por favor, ingresa una nueva contraseña para completar el proceso de restablecimiento de contraseña.</p>
                        </div>
                        <div className="form-container">
                            <form onSubmit={submitHandler}>
                                <div className="group">
                                    <input
                                        type={showNewPassword ? "text" : "password"}
                                        name="newPassword"
                                        value={formData.newPassword}
                                        required
                                        onChange={(e) => handleFormInputChange(e, formData, setFormData)}
                                    />
                                    <button type="button" onClick={() => setShowNewPassword(!showNewPassword)}>
                                        {
                                            showNewPassword
                                                ? <VisibilityIcon sx={{ fontSize: 25 }} />
                                                : <VisibilityOffIcon sx={{ fontSize: 25 }} />
                                        }
                                    </button>
                                    <span className="highlight"></span>
                                    <span className="bar"></span>
                                    <label htmlFor="newPassword">Nueva Contraseña</label>
                                </div>
                                <div className="group">
                                    <input
                                        type={showNewPassword ? "text" : "password"}
                                        name="confirmNewPassword"
                                        value={formData.confirmNewPassword}
                                        required
                                        onChange={(e) => handleFormInputChange(e, formData, setFormData)}
                                    />
                                    <button type="button" onClick={() => setShowNewPassword(!showNewPassword)}>
                                        {
                                            showNewPassword
                                                ? <VisibilityIcon sx={{ fontSize: 25 }} />
                                                : <VisibilityOffIcon sx={{ fontSize: 25 }} />
                                        }
                                    </button>
                                    <span className="highlight"></span>
                                    <span className="bar"></span>
                                    <label htmlFor="confirmNewPassword">Confirmar Nueva Contraseña</label>
                                </div>
                                <div className="form-submit">
                                    <button type="submit">Restablecer</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </article>
            </section>
        </main>
    )
}

export default RestorePassword