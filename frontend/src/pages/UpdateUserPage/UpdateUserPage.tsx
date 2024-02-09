import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import { Navbar, Sidebar } from "@/components";
import { LoadingSpinner, Footer, Form, FormField, CheckboxFormField, Checkbox } from '@/components/ui';
import { useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { UserCard } from './components';
import { ApiError, LoadingSpinnerType, TypeWithKey } from '@/models';
import { useParams } from 'react-router-dom';
import { useGetUser, useUpdateUserMutation } from '@/hooks';
import { getError } from '@/utilities';
import { toast } from 'react-toastify';
import '@/styles/pages/UpdateUserPage/UpdateUserPage.scss';
import { Typography } from '@mui/material';

type UpdateUserData = {
    name: string,
    email: string,
    isAdmin: boolean | undefined,
    verify: boolean | undefined
}

interface UpdateUserPageInterface {}

const UpdateUserPage: React.FC<UpdateUserPageInterface> = () => {
    const params = useParams();
    const { id: userId } = params;

    const { data: user, isLoading: isLoadingUser, error, refetch } = useGetUser(userId!);

    const { mutateAsync: updateUser, isLoading: isLoadingUpdate } = useUpdateUserMutation(userId!);

    //Form inputs values
    const [formData, setFormData] = useState<UpdateUserData>({ name: '', email: '', isAdmin: undefined, verify: undefined });

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

    const handleUpdateUserData = (key: keyof UpdateUserData, value: string) => setFormData((prevFormData) => ({ ...prevFormData, [key]: value }));

    const submitHandler = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const { name, email, isAdmin, verify } = formData;

            // If the new email is the same as the current one, reset it
            if (email === user.email) {
                setFormData({ ...formData, email: '' });
                toast.warning('El correo electrónico no puede ser el mismo que el actual.');
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
    isLoadingUser
    ? <LoadingSpinner type={LoadingSpinnerType.NOFLEX}/> : error
    ? <Typography fontSize={20} fontWeight="bold" component="h2" noWrap={false}>{getError(error as ApiError)}</Typography>
    : (
    <>
        <Helmet>
            <title>Actualizar Usuario</title>
        </Helmet>

        <Navbar />

        <main className="main--admin">
            <Sidebar />

            <section className="update-user">
                <article>
                    <UserCard references={userRefs} data={user} />
                </article>

                <article className="update-user__form">
                    <Helmet>
                        <title>Actualizar Usuario - SABRINA</title>
                    </Helmet>

                    <Form
                        formTitle="Actualizar Usuario"
                        buttonText="Actualizar usuario"
                        buttonProps={{ disabled: isLoadingUser || isLoadingUpdate }}
                        onSubmit={submitHandler}
                    >
                        <FormField
                            label="Nombre"
                            type="text"
                            name="name"
                            value={formData.name}
                            ref={nameRef}
                            pattern=".{4,25}"
                            title="El nombre debe tener entre 4 y 25 caracteres"
                            customClass={formData.name !== '' ? 'form-field__input--active' : ''}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleUpdateUserData('name', e.target.value)}
                        />
                        
                        <FormField
                            label="Correo electrónico"
                            type="email"
                            name="email"
                            value={formData.email}
                            ref={emailRef}
                            customClass={formData.email !== '' ? 'form-field__input--active' : ''}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleUpdateUserData('email', e.target.value)}
                        />

                        <CheckboxFormField>
                            <Checkbox
                                label="Admin"
                                template="default"
                                checkCondition={formData.isAdmin !== undefined && formData.isAdmin}
                                name="isAdmin"
                                ref={adminRef}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleUpdateUserData('isAdmin', e.target.value)}
                            >
                                <AdminPanelSettingsOutlinedIcon sx={{ fontSize: 48 }} />
                            </Checkbox>
                            <Checkbox
                                label="Verificado"
                                template="default"
                                checkCondition={formData.verify !== undefined && formData.verify}
                                name="verify"
                                ref={verifyRef}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleUpdateUserData('verify', e.target.value)}
                            >
                                <BadgeOutlinedIcon sx={{ fontSize: 48 }} />
                            </Checkbox>
                        </CheckboxFormField>
                    </Form>
                </article>
            </section>
        </main>
        <Footer />
    </>
    )
  )
}

export default UpdateUserPage