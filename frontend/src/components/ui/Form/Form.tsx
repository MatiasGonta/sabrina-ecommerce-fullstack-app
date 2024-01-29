import React, { HTMLProps, ReactElement, useState } from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import CloseIcon from '@mui/icons-material/Close';
import { Tooltip, Typography } from '@mui/material';

interface FormInterface extends HTMLProps<HTMLFormElement> {
    formTitle: string;
    formSubtitle?: string;
    buttonText: string;
    children: React.ReactNode | React.ReactNode[];
    columns?: 1 | 2;
    buttonProps?: Omit<HTMLProps<HTMLButtonElement>, "type">;
}

export const Form: React.FC<FormInterface> = ({ formTitle, formSubtitle, buttonText, children, columns = 1, buttonProps, ...rest }) => {
    return (
        <div className="form-wrapper">
            <Typography fontSize={35} fontWeight="bold" lineHeight={1.2} mt="30px" mb="30px" component="h3" noWrap={false}>
                {formTitle}
            </Typography>
            {formSubtitle && <p className="form-wrapper__subtitle">{formSubtitle}</p>}
            <form className={`form-wrapper__form ${columns === 2 && "form-wrapper__form--multi-column"}`} {...rest}>
                {children}
                <div className="form-wrapper__form__submit-btn">
                    <button type="submit" {...buttonProps}>{buttonText}</button>
                </div>
            </form>
        </div>
    )
}

interface FormFieldInterface extends HTMLProps<HTMLInputElement> {
    label: string;
    type: 'text' | 'password' | 'number' | 'email';
    children?: ReactElement<FieldRecommendationsInterface>;
    customClass?: string;
}

export const FormField: React.FC<FormFieldInterface> = ({ label, children, customClass, type, name, ...rest }) => {
    const [showPassword, setShowPassword] = useState<boolean>(false);

    return (
        <div className="form-field">
            <input
                type={type === 'password' ? (showPassword ? 'text' : 'password') : type}
                className={`form-field__input ${customClass}`}
                {...rest}
            />
            <span className="form-field__highlight"></span>
            <span className="form-field__bar"></span>
            <label htmlFor={name} className="form-field__label">{label}</label>
            {
                type === 'password' && (
                    <button className="form-field__show-btn" type="button" onClick={() => setShowPassword(!showPassword)}>
                        {
                            showPassword
                                ? <VisibilityIcon sx={{ fontSize: 25 }} />
                                : <VisibilityOffIcon sx={{ fontSize: 25 }} />
                        }
                    </button>
                )
            }
            {type === 'text' && children}
        </div>
    )
}

interface FieldRecommendationsInterface {
    children: React.ReactElement<HTMLLIElement> | React.ReactElement<HTMLLIElement>[];
}

export const FieldRecommendations: React.FC<FieldRecommendationsInterface> = ({ children }) => {
    return (
        <div className="field-recommendations">
            <Typography fontSize={11.5} fontWeight="bold" display="inline" component="h5" mt="2.5px" noWrap={false}>Existentes:</Typography>
            <ul className="field-recommendations__list">
                {children}
            </ul>
        </div>
    )
}

interface CheckboxFormFieldInterface {
    title?: string;
    children: React.ReactElement<CheckboxInterface> | React.ReactElement<CheckboxInterface>[];
}

export const CheckboxFormField: React.FC<CheckboxFormFieldInterface> = ({ title, children }) => {
    return (
        <div className="checkbox-field">
            {title && <Typography fontSize={18} fontWeight="lighter" component="h5" mb="10px" noWrap={false}>{title}</Typography>}
            <ul className="checkbox-field__list">
                {children}
            </ul>
        </div>
    )
}

interface CheckboxInterface extends HTMLProps<HTMLInputElement> {
    label: string;
    template: 'default' | 'small';
    checkCondition: boolean;
    children: React.ReactNode;
}

export const Checkbox: React.FC<CheckboxInterface> = ({ label, template, checkCondition, children, ...rest }) => {
    return (
        <li className={`checkbox ${template === 'small' ? 'checkbox--small' : ''}`}>
            <label>
                <input
                    type="checkbox"
                    className="checkbox__input"
                    {...rest}
                />
                <span className={`checkbox__tile ${checkCondition && "checkbox__tile--checked"}`}>
                    <span className="checkbox__tile__icon">
                        {children}
                    </span>
                    <span className="checkbox__tile__label">{label}</span>
                </span>
            </label>
        </li>
    )
}

interface FileFormFieldInterface extends HTMLProps<HTMLInputElement> {
    images: (string | File)[];
    selectedIndex: number;
    handleSelectedIndex: (index: number) => void;
    onClickFunc: (index: number) => void;
}

export const FileFormField: React.FC<FileFormFieldInterface> = ({ images, selectedIndex, handleSelectedIndex, onClickFunc, ...rest }) => {
    return (
        <div className="file-field">
            <input
                type="file"
                name="images"
                accept="image/*"
                className="file-field__input"
                multiple
                {...rest}
            />
            <AddPhotoAlternateOutlinedIcon sx={{ fontSize: 50, margin: '15px 0' }} />
            <label htmlFor="images" className="file-field__label">
                Imágenes <span>(De no seleccionar ninguna, la primer imagen añadida sera la principal)</span>
            </label>
            {
                images &&
                <ul className="file-field__selected-list">
                    {images.map((image: File | string, index: number) => (
                        <li key={index} className="selected-image">
                            <div className={selectedIndex === index ? "selected-image__img selected-image__img--selected" : "selected-image__img"}>
                                {
                                    typeof image === 'string'
                                        ? (
                                            <img
                                                src={image}
                                                alt={`Imagen ${index + 1}`}
                                                onClick={() => handleSelectedIndex(index)}
                                            />
                                        ) : (
                                            <img
                                                src={URL.createObjectURL(image)}
                                                alt={`Imagen ${index + 1}`}
                                                onClick={() => handleSelectedIndex(index)}
                                            />
                                        )
                                }
                            </div>
                            <Tooltip title="Cerrar">
                                <div className="selected-image__close" onClick={() => onClickFunc(index)}>
                                    <CloseIcon sx={{ fontSize: 20 }} />
                                </div>
                            </Tooltip>
                        </li>
                    ))}
                </ul>
            }
        </div>
    )
}

interface SwitchFormFieldInterface extends HTMLProps<HTMLInputElement> {
    switchTitle: string;
}

export const SwitchFormField: React.FC<SwitchFormFieldInterface> = ({ switchTitle, ...rest }) => {
    return (
        <div className="switch-field">
            <Typography fontSize={18} fontWeight="lighter" component="h5" mb="10px" noWrap={false}>{switchTitle}</Typography>
            <div className="switch">
                <input
                    name="switch"
                    type="checkbox"
                    className="switch__input"
                    {...rest}
                />
                <label htmlFor="switch" className="switch__label"></label>
            </div>
        </div>
    )
}