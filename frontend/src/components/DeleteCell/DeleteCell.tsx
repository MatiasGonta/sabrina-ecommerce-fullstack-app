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
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
    <div>
      <Tooltip title='Eliminar'>
        <button className="delete-btn">
          <DeleteForeverOutlinedIcon
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
          <div className="delete-modal">
            <ErrorOutlineOutlinedIcon className="delete-modal__icon" sx={{ fontSize: 75 }} />
            <span>¿Estas seguro?</span>
            <div>
              <button onClick={handleDeleteOrder}>Eliminar</button>
              <button onClick={handleClose}>Cancelar</button>
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  )
}

export default DeleteCell