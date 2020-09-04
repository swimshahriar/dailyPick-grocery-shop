import React from 'react';
import { Modal, Button, Typography } from '@material-ui/core';
import { DoneOutlined, CloseOutlined } from '@material-ui/icons';
import useStyles from './ModalCompStyles';

const ModalComp = ({ isModalOpen, setIsModalOpen, confirmHandler }) => {
  const classes = useStyles();

  const handleClose = () => {
    setIsModalOpen(false);
  };
  return (
    <Modal
      open={isModalOpen}
      onClose={handleClose}
      aria-labelledby="confirmation"
      className={classes.modal}
    >
      <div className={classes.paper}>
        <Typography id="confirmation" variant="h4">
          Are You Sure?
        </Typography>
        <div className={classes.modalText}>
          <Button
            startIcon={<CloseOutlined />}
            onClick={() => setIsModalOpen(false)}
            variant="outlined"
            color="primary"
          >
            No
          </Button>
          <Button
            startIcon={<DoneOutlined />}
            onClick={() => confirmHandler()}
            variant="contained"
            color="primary"
            className={classes.confirmBtn}
          >
            Yes
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ModalComp;
