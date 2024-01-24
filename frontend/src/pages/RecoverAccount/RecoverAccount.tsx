import { ApiError, TypeWithKey } from "@/models";
import { getError, handleFormInputChange } from "@/utilities";
import { useSendRestorePasswordEmail } from "@/hooks";
import { Helmet } from "react-helmet-async";
import { toast } from "react-toastify";
import { useState } from "react";
import '@/styles/pages/RecoverAccount/RecoverAccount.scss';

interface RecoverAccountInterface { }

const RecoverAccount: React.FC<RecoverAccountInterface> = () => {
    const { mutateAsync: sendRestorePasswordEmail } = useSendRestorePasswordEmail();

    const [formData, setFormData] = useState<TypeWithKey<string>>({ email: '' });

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
                        <div className="recover-account-form__header">
                            <h3 className="recover-account-form__header__title">Recupera tu cuenta</h3>
                            <p>Ingresa tu correo electrónico para buscar tu cuenta.</p>
                        </div>
                        <div className="form-container">
                            <form onSubmit={submitHandler}>
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
                                    <label htmlFor="name">Correo electrónico</label>
                                </div>
                                <div className="form-submit">
                                    <button type="submit">Buscar</button>
                                </div>
                            </form> 
                        </div>
                    </div>
                </article>
            </section>
        </main>
    )
}

export default RecoverAccount