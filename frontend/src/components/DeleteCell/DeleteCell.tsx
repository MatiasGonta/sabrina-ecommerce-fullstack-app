import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import { Tooltip, Fade, Modal, Backdrop } from '@mui/material';
import { ApiError } from "@/models";
import { getError } from "@/utilities";
import { toast } from "react-toastify";
import { useState } from 'react';

interface DeleteCellInterface {
  id: string;
  deleteFunc: (id: string) => Promise<any>;
  loadingMsg: string;
}

const DeleteCell: React.FC<DeleteCellInterface> = ({ id, deleteFunc, loadingMsg }) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  const handleDeleteOrder = async () => {
    try {
      await toast.promise(deleteFunc(id), {
        pending: {
          render() {
            return loadingMsg
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
    <>
      <Tooltip title='Eliminar'>
        <button className="table-delete-btn">
          <DeleteForeverOutlinedIcon
            sx={{ fontSize: 25, cursor: 'pointer' }}
            type="button"
            onClick={handleOpen}
          />
        </button>
      </Tooltip>
      <Modal
        open={isOpen}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={isOpen}>
          <div className="delete-modal">
            <ErrorOutlineOutlinedIcon className="delete-modal__icon" sx={{ fontSize: 75 }} />
            <span className="delete-modal__msg">¿Estas seguro?</span>
            <div className="delete-modal__buttons">
              <button className="delete-modal__buttons-delete" onClick={handleDeleteOrder}>Eliminar</button>
              <button className="delete-modal__buttons-cancel" onClick={handleClose}>Cancelar</button>
            </div>
          </div>
        </Fade>
      </Modal>
    </>
  )
}

export default DeleteCell