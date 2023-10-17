import { TypeWithKey } from "@/models";

export const handleFormInputChange = (e: any, data: TypeWithKey<any>, updateDataFunc: React.Dispatch<any>) => {
    const { name, value } = e.target;
    e.preventDefault();

    if (name === 'name' || name === 'category') {
        const formattedValue = value.toLowerCase().split(' ').map((word: string) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

        updateDataFunc({ ...data, [name]: formattedValue });
        return;
    }

    updateDataFunc({ ...data, [name]: value });
};