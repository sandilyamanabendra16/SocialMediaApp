import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import PostShare from '../PostShare/PostShare';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  outline: 0
};

export default function ShareModal({modalOpened,  setModalOpened}) {

  return (
    <div>
      <Modal
        open={modalOpened}
        onClose={()=>setModalOpened(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
            <PostShare/>
        </Box>
      </Modal>
    </div>
  );
}

