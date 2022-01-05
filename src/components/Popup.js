import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog(props) {

  const handleClose = () => {
    props.setOpen(false);
    props.setClose()
  };

  return (
    <Dialog
      fullScreen
      open={props.open}
      onClose={(handleClose)}
      TransitionComponent={Transition}
    >
      <AppBar sx={{ position: 'relative',backgroundColor:"black" }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            {props.title}
          </Typography>
        </Toolbar>
      </AppBar>
      {props.children}
    </Dialog>
  );
}
