import React, {useContext} from 'react';
import PropTypes from'prop-types';
import {Dialog, DialogTitle} from "@material-ui/core";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import {TodoContext} from "../contexts/TodoContext";

function DeleteDialog(props) {

    const hide = ()=>{props.setDeleteConfirmationIsShown(false)};
    const context = useContext(TodoContext)
    return (
       <Dialog onClose={hide} open={props.open} fullWidth={true} maxWidth='sm'>
            <DialogTitle>Are you sure you wish to delete this to-do?</DialogTitle>
           <DialogContent>
               {props.todo.name}
           </DialogContent>
           <DialogActions>
               <Button onClick={hide}>Cancel</Button>
               <Button onClick={()=> {context.deleteTodo(props.todo); hide()}}>Delete</Button>
           </DialogActions>
       </Dialog>
    );
}

DeleteDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    setDeleteConfirmationIsShown: PropTypes.func.isRequired,
    todo: PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string
    })
}
export default DeleteDialog;