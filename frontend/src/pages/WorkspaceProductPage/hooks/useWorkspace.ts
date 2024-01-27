import { useState } from "react";
import { WorkspaceFormData } from "../models";
import { toast } from "react-toastify";

export const useWorkspace = (initialFormData: WorkspaceFormData) => {
    const isLoadingInitialFormData = (
        !initialFormData.name ||
        !initialFormData.images ||
        !initialFormData.category ||
        !initialFormData.brand ||
        !initialFormData.price ||
        !initialFormData.colors ||
        !initialFormData.sizes ||
        !initialFormData.countInStockByVariant
    );

    const [formData, setFormData] = useState<WorkspaceFormData>(initialFormData);
    const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);

    const handleWorkspaceProductData = (prop: keyof WorkspaceFormData, value: string) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            [prop]: value
        }));
    }

    const handleCheckboxWorkspaceProductData = (e: React.ChangeEvent<HTMLInputElement>, prop: { name: 'colors' | 'sizes', value: string[] }) => {
        const { name, checked } = e.target;
        e.preventDefault();

        let updatedPropValue: string[];

        if (checked && !prop.value.includes(name)) {
            updatedPropValue = [...prop.value, name];

            setFormData((prevFormData) => ({
                ...prevFormData,
                [prop.name]: updatedPropValue,
            }));
        } else if (prop.value.includes(name)) {
            updatedPropValue = prop.value.filter((color: string) => color !== name);

            setFormData((prevFormData) => ({
                ...prevFormData,
                [prop.name]: updatedPropValue,
            }));
        }
    }

    const handleStockWorkspaceProductData = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        e.preventDefault();

        setFormData((prevFormData) => ({
            ...prevFormData,
            countInStockByVariant: {
                ...prevFormData.countInStockByVariant,
                [name]: parseInt(value) || 0,
            }
        }));
    };

    const handleAddImageWorkspaceProductData = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { files } = e.target;
        e.preventDefault();

        if (files && formData.images && formData.images.length < 7) {
            const selectedImages = Array.from(files);
            const updatedImages = [...formData.images, ...selectedImages];
            setFormData({ ...formData, images: updatedImages });
            return;
        }

        toast.warn('Máximo 6 imágenes permitidas.');
        return;
    }

    const handleRemoveImageWorkspaceProductData = (index: number) => {
        let updatedImages = [...formData.images];
        updatedImages.splice(index, 1);
        setFormData({
            ...formData,
            images: updatedImages,
        });

        if (index === selectedImageIndex) {
            setSelectedImageIndex(0);
        }
    };

    return {
        formData,
        setFormData,
        selectedImageIndex,
        setSelectedImageIndex,
        isLoadingInitialFormData,
        handleWorkspaceProductData,
        handleCheckboxWorkspaceProductData,
        handleStockWorkspaceProductData,
        handleAddImageWorkspaceProductData,
        handleRemoveImageWorkspaceProductData
    };
}