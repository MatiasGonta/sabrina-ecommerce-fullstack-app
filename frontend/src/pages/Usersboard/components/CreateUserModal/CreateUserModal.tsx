import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import { useSignupMutation } from "@/hooks";
import { ApiError } from "@/models";
import { getError } from "@/utilities";
import { useState } from "react";
import { toast } from "react-toastify";
import { Tooltip } from '@mui/material';
import { Checkbox, CheckboxFormField, Form, FormField } from '@/components/ui';

type CreateUserData = {
    name: string,
    email: string,
    password: string,
    confirmPassword: string,
    isAdmin: boolean,
    verify: boolean
}

interface CreateUserModal { }

const CreateUserModal: React.FC<CreateUserModal> = () => {
    const [openModal, setOpenModal] = useState<boolean>(false);

    //Form inputs values
    const [formData, setFormData] = useState<CreateUserData>({ name: '', email: '', password: '', confirmPassword: '', isAdmin: false, verify: false });

    const handleCreateUserData = (prop: keyof CreateUserData, value: string) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            [prop]: value
        }));
    }

    const { mutateAsync: signup, isLoading } = useSignupMutation();

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

                        <Form
                            formTitle="Crear Usuario"
                            buttonText="Crear usuario"
                            buttonProps={{ disabled: isLoading }}
                            onSubmit={submitHandler}
                        >
                            <FormField
                                label="Nombre"
                                type="text"
                                name="name"
                                defaultValue={formData.name}
                                pattern=".{4,25}"
                                title="El nombre debe tener entre 4 y 25 caracteres"
                                customClass={formData.name !== '' ? 'form-field__input--active' : ''}
                                required
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleCreateUserData('name', e.target.value)}
                            />   

                            <FormField
                                label="Correo electrónico"
                                type="email"
                                name="email"
                                defaultValue={formData.email}
                                required
                                customClass={formData.email !== '' ? 'form-field__input--active' : ''}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleCreateUserData('email', e.target.value)}
                            />  

                            <FormField
                                label="Contraseña"
                                type="password"
                                name="password"
                                defaultValue={formData.password}
                                required
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleCreateUserData('password', e.target.value)}
                            />   

                            <FormField
                                label="Confirmar Contraseña"
                                type="password"
                                name="confirmPassword"
                                defaultValue={formData.confirmPassword}
                                required
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleCreateUserData('confirmPassword', e.target.value)}
                            /> 

                            <CheckboxFormField>
                                <Checkbox
                                    label="Admin"
                                    template="default"
                                    checkCondition={formData.isAdmin}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleCreateUserData('isAdmin', e.target.value)}
                                >
                                    <AdminPanelSettingsOutlinedIcon sx={{ fontSize: 48 }} />
                                </Checkbox>
                                <Checkbox
                                    label="Verificado"
                                    template="default"
                                    checkCondition={formData.verify}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleCreateUserData('verify', e.target.value)}
                                >
                                    <BadgeOutlinedIcon sx={{ fontSize: 48 }} />
                                </Checkbox>
                            </CheckboxFormField>  
                        </Form>
                    </div>
                </>
            )}
        </>
    )
}

export default CreateUserModal