import { ApiError, Routes } from "@/models";
import { getError } from "@/utilities";
import { useNavigate, useLocation } from "react-router-dom";
import { useRestorePasswordMutation } from "@/hooks";
import { Helmet } from "react-helmet-async";
import { toast } from "react-toastify";
import { useState } from "react";
import { Form, FormField } from '@/components/ui';
import '@/styles/pages/RestorePassword/RestorePassword.scss';

type RestoreData = {
    newPassword: string,
    confirmNewPassword: string
}

interface RestorePasswordInterface { }

const RestorePassword: React.FC<RestorePasswordInterface> = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    const emailToken = queryParams.get('emailToken');

    const { mutateAsync: restorePassword, isLoading } = useRestorePasswordMutation();

    const [formData, setFormData] = useState<RestoreData>({ newPassword: '', confirmNewPassword: '' });

    const handleFormData = (key: keyof RestoreData, value: string) => setFormData((prevFormData) => ({ ...prevFormData, [key]: value }));

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
                    <div className="restore-password-form">
                        <Form
                            formTitle="Restablecer contraseña"
                            formSubtitle="Por favor, ingresa una nueva contraseña para completar el proceso de restablecimiento de contraseña."
                            buttonText="Restablecer"
                            buttonProps={{ disabled: isLoading }}
                            onSubmit={submitHandler}
                        >
                            <FormField
                                label="Nueva Contraseña"
                                type="password"
                                name="newPassword"
                                defaultValue={formData.newPassword}
                                required
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleFormData('newPassword', e.target.value)}
                            />

                            <FormField
                                label="Confirmar Nueva Contraseña"
                                type="password"
                                name="confirmNewPassword"
                                defaultValue={formData.confirmNewPassword}
                                required
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleFormData('confirmNewPassword', e.target.value)}
                            />
                        </Form>
                    </div>
                </article>
            </section>
        </main>
    )
}

export default RestorePassword