import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import { Navbar, Sidebar } from "@/components";
import { LoadingSpinner, Footer } from '@/components/ui';
import { useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { UserCard } from './components';
import { ApiError, LoadingSpinnerType, TypeWithKey } from '@/models';
import { useParams } from 'react-router-dom';
import { useGetUser, useUpdateUserMutation } from '@/hooks';
import { getError, handleFormInputChange } from '@/utilities';
import { toast } from 'react-toastify';
import '@/styles/pages/UpdateUserPage/UpdateUserPage.scss';

interface UpdateUserPageInterface {}

const UpdateUserPage: React.FC<UpdateUserPageInterface> = () => {
    const params = useParams();
    const { id: userId } = params;

    const { data: user, isLoading, error, refetch } = useGetUser(userId!);

    const { mutateAsync: updateUser } = useUpdateUserMutation(userId!);

    //Form inputs values
    const [formData, setFormData] = useState<{
        name: string,
        email: string,
        isAdmin: boolean | undefined,
        verify: boolean | undefined
    }>({ name: '', email: '', isAdmin: undefined, verify: undefined });

    // Form inputs refs
    const nameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const adminRef = useRef<HTMLInputElement>(null);
    const verifyRef = useRef<HTMLInputElement>(null);

    const userRefs: TypeWithKey<React.MutableRefObject<HTMLInputElement | null>> = {
        name: nameRef,
        email: emailRef,
        admin: adminRef,
        verify: verifyRef
    }

    const submitHandler = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const { name, email, isAdmin, verify } = formData;

            // If the new email is the same as the current one, reset it
            if (email === user.email) {
                setFormData({ ...formData, email: '' })
            }

            await toast.promise(updateUser({ name, email, isAdmin, verify }), {
                pending: {
                    render() {
                        return `Actualizando información del usuario...`
                    },
                },
                success: {
                    render({data}) {
                        return data.message
                    },
                },
            });
            
            refetch();
        } catch (error) {
            toast.error(getError(error as ApiError));
        }
    }

  return (
    isLoading
    ? <LoadingSpinner type={LoadingSpinnerType.NOFLEX}/> : error
    ? <h4>{getError(error as ApiError)}</h4>
    : (
    <>
        <Helmet>
            <title>Actualizar Usuario</title>
        </Helmet>
        <Navbar />
        <main className="main--admin">
            <Sidebar page="usersboard" />
            <section className="update-user">
                <article className="update-user__card">
                    <UserCard references={userRefs} data={user} />
                </article>
                <article className="update-user__form">
                    <Helmet>
                        <title>Actualizar Usuario - SABRINA</title>
                    </Helmet>
                    <div className="form-container">
                    <h3>Actualizar usuario</h3>
                    <form onSubmit={(e) => submitHandler(e)}>
                        <div className="group">
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                ref={nameRef}
                                pattern=".{4,25}"
                                title="El nombre debe tener entre 4 y 25 caracteres"
                                className={formData.name !== '' ? 'active' : ''}
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
                                ref={emailRef}
                                className={formData.email !== '' ? 'active' : ''}
                                onChange={(e) => handleFormInputChange(e, formData, setFormData)}
                            />
                            <span className="highlight"></span>
                            <span className="bar"></span>
                            <label htmlFor="email">Correo electrónico</label>
                        </div>
                        <div className="checkbox-container">
                            <div className="checkbox">
		                        <label className="checkbox-wrapper">
		                        	<input
                                        type="checkbox"
                                        name="isAdmin"
                                        className="checkbox-input"
                                        ref={adminRef}
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
                                        ref={verifyRef}
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
                            <button type="submit">Actualizar Usuario</button>
                        </div>
                    </form>
                    </div>
                </article>
            </section>
        </main>
        <Footer />
    </>
    )
  )
}

export default UpdateUserPage