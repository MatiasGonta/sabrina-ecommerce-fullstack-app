import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import CloseIcon from '@mui/icons-material/Close';
import { Tooltip, Fade, Modal, Backdrop } from '@mui/material';
import { ApiError, CartItem } from "@/models";
import { getError } from "@/utilities";
import { toast } from "react-toastify";
import { useState } from 'react';
import { useUpdateOrderMutation, useUpdateProductStock } from '@/hooks';

interface UpdateCellInterface {
    orderId: string;
    orderItems: CartItem[];
    isDelivered: boolean;
    isPaid: boolean;
    payMethod: 'PayPal' | 'MercadoPago' | 'Efectivo' | 'Otros' | 'Transferencia' | 'Depósito' | 'Rapi Pago' | 'Pago Fácil' | 'Billetera Santa Fe';
}

const UpdateCell: React.FC<UpdateCellInterface> = ({ orderId, orderItems, isDelivered, isPaid, payMethod }) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    // Update order data
    const [formData, setFormData] = useState<{
        delivered: boolean;
        paid: boolean;
        paymentMethod: 'PayPal' | 'MercadoPago' | 'Efectivo' | 'Otros' | 'Transferencia' | 'Depósito' | 'Rapi Pago' | 'Pago Fácil' | 'Billetera Santa Fe';
    }>({
        delivered: isDelivered,
        paid: isPaid,
        paymentMethod: payMethod
    });

    const { mutateAsync: updateStock } = useUpdateProductStock();
    const { mutateAsync: updateOrder } = useUpdateOrderMutation();

    // Handle update submit
    const handleUpdateOrderSubmit = async (e: React.SyntheticEvent) => {
        try {
            e.preventDefault();

            const { delivered, paid, paymentMethod } = formData;

            if (paid && paid !== isPaid) {
                await updateStock({ orderItems: orderItems, action: 'discount' });
            } else if (!paid && paid !== isPaid) {
                await updateStock({ orderItems: orderItems, action: 'restore' });
            }

            await toast.promise(updateOrder({ orderId, delivered, paid, paymentMethod }), {
                pending: {
                    render() {
                        return 'Actualizando orden...'
                    },
                },
                success: {
                    render({ data }) {
                        return data.message
                    },
                },
            });

            handleClose();
        } catch (error) {
            toast.error(getError(error as ApiError));
        }
    };

    return (
        <div>
            <Tooltip title='Actualizar'>
                <button className="table-edit-btn">
                    <EditOutlinedIcon
                        sx={{ fontSize: 25, cursor: 'pointer' }}
                        type="button"
                        onClick={handleOpen}
                    />
                </button>
            </Tooltip>
            <Modal
                open={open}
                onClose={handleClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={open}>
                    <div className="update-modal">
                        <EditOutlinedIcon className="update-modal__icon" sx={{ fontSize: 90 }} />
                        <span className="update-modal__msg">Actualizar orden</span>
                        <form className="update-modal__form" onSubmit={handleUpdateOrderSubmit} >
                            <Tooltip title="Cerrar">
                                <CloseIcon
                                    sx={{ fontSize: 25 }}
                                    className="update-modal__form__close"
                                    onClick={handleClose}
                                />
                            </Tooltip>
                            <div className="update-modal__form__option">
                                <input
                                    type="checkbox"
                                    name="delivered"
                                    checked={formData.delivered}
                                    onChange={(e) => setFormData({ ...formData, delivered: e.target.checked })}
                                />
                                <label htmlFor="delivered">Entregado</label>
                                <svg viewBox="0 0 35.6 35.6">
                                    <circle className="background" cx="17.8" cy="17.8" r="17.8"></circle>
                                    <circle className="stroke" cx="17.8" cy="17.8" r="14.37"></circle>
                                    <polyline className="check" points="11.78 18.12 15.55 22.23 25.17 12.87"></polyline>
                                </svg>
                            </div>
                            <div className="update-modal__form__option">
                                <input
                                    type="checkbox"
                                    name="paid"
                                    checked={formData.paid}
                                    onChange={(e) => setFormData({ ...formData, paid: e.target.checked })}
                                />
                                <label htmlFor="paid">Pagado</label>
                                <svg viewBox="0 0 35.6 35.6">
                                    <circle className="background" cx="17.8" cy="17.8" r="17.8"></circle>
                                    <circle className="stroke" cx="17.8" cy="17.8" r="14.37"></circle>
                                    <polyline className="check" points="11.78 18.12 15.55 22.23 25.17 12.87"></polyline>
                                </svg>
                            </div>
                            <div className="update-modal__form__option">
                                <select
                                    id="paymentMethod"
                                    name="paymentMethod"
                                    value={formData.paymentMethod}
                                    onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value as 'PayPal' | 'MercadoPago' | 'Efectivo' | 'Otros' | 'Transferencia' | 'Depósito' | 'Rapi Pago' | 'Pago Fácil' | 'Billetera Santa Fe' })}
                                >
                                    <option value="PayPal">PayPal</option>
                                    <option value="MercadoPago">MercadoPago</option>
                                    <option value="Efectivo">Efectivo</option>
                                    <option value="Transferencia">Transferencia</option>
                                    <option value="Depósito">Depósito</option>
                                    <option value="Rapi Pago">Rapi Pago</option>
                                    <option value="Pago Fácil">Pago Fácil</option>
                                    <option value="Billetera Santa Fe">Billetera Santa Fe</option>
                                </select>
                                <span className="highlight"></span>
                                <span className="bar"></span>
                                <label htmlFor="paymentMethod">Pagado con</label>
                            </div>
                            <div>
                                <button type="submit">Actualizar</button>
                            </div>
                        </form>
                    </div>
                </Fade>
            </Modal>
        </div>
    )
}

export default UpdateCell