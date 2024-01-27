import { ApiError, TypeWithKey } from "@/models";
import { getError } from "@/utilities";
import { useSendRestorePasswordEmail } from "@/hooks";
import { Helmet } from "react-helmet-async";
import { toast } from "react-toastify";
import { useState } from "react";
import { Form, FormField } from "@/components/ui";
import '@/styles/pages/RecoverAccount/RecoverAccount.scss';

interface RecoverAccountInterface { }

const RecoverAccount: React.FC<RecoverAccountInterface> = () => {
    const { mutateAsync: sendRestorePasswordEmail, isLoading } = useSendRestorePasswordEmail();

    const [formData, setFormData] = useState<TypeWithKey<string>>({ email: '' });

    const handleFormData = (value: string) => setFormData({ email: value });

    const submitHandler = async (e: React.SyntheticEvent) => {
        e.preventDefault();

        if (formData.email.trim() === '') return;

        try {
            await toast.promise(sendRestorePasswordEmail(formData.email), {
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
            }, {
                autoClose: 6000
            });
        } catch (error) {
            toast.error(getError(error as ApiError));
        }
    }

    return (
        <main className="main--recover-account">
            <Helmet>
                <title>Recupera tu cuenta</title>
            </Helmet>
            <section>
                <article className="recover-account-wrapper">
                    <div className="recover-account-form">
                        <Form
                            formTitle="Recupera tu cuenta"
                            formSubtitle="Ingresa tu correo electrónico para buscar tu cuenta."
                            buttonText="Buscar"
                            buttonProps={{ disabled: isLoading }}
                            onSubmit={submitHandler}
                        >
                            <FormField
                                label="Correo electrónico"
                                type="email"
                                name="email"
                                defaultValue={formData.email}
                                customClass={formData.email !== '' ? 'form-field__input--active' : ''}
                                required
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleFormData(e.target.value)}
                            />
                        </Form>
                    </div>
                </article>
            </section>
        </main>
    )
}

export default RecoverAccount