import React, {Fragment, useContext, useState} from 'react';
import {TodoContext} from "../contexts/TodoContext";
import {Table} from "@material-ui/core";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import EditIcon from '@material-ui/icons/Edit';
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from '@material-ui/icons/Delete';
import TextField from "@material-ui/core/TextField";
import AddIcon from '@material-ui/icons/Add';
import DoneIcon from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/Close';
import DeleteDialog from "./DeleteDialog";

function TodoTable() {
    const context = useContext(TodoContext)
    const [addTodo, setAddTodo] = useState('')
    const [editIsShown, setEditIsShown] = useState(false)
    const  [editTodo, setEditTodo] = useState('')
    const [deleteConfirmationIsShown, setDeleteConfirmationIsShown] = useState(false)
    const [todoToBeDeleted,setTodoToBeDeleted] = useState(null);

    return (
        <Fragment>
        <form onSubmit={(e)=>{context.createTodo(e,{name: addTodo});} }>
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>Task</TableCell>
                    <TableCell align="right">Actions</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                <TableRow>
                    <TableCell>
                        <TextField value={addTodo} onChange={(event)=>{setAddTodo(event.target.value)}} label="New Task" fullWidth={true} />
                    </TableCell>
                    <TableCell align="right">
                        <IconButton type="submit">
                            <AddIcon/>
                        </IconButton>
                    </TableCell>
                </TableRow>
                {context.todos.slice().reverse().map((todo, index)=> (
                    <TableRow key={'todo' + index}>
                        <TableCell>
                            {editIsShown===todo.id ?
                                <TextField
                                    fullWidth={true}
                                    value={editTodo}
                                    onChange={(e)=>{setEditTodo(e.target.value)}}
                                    InputProps={{
                                        endAdornment: <Fragment>
                                            <IconButton onClick={()=>{context.updateTodo({id: todo.id, name: editTodo});setEditIsShown(false)}}><DoneIcon/></IconButton>
                                            <IconButton onClick={()=>{setEditIsShown(false)}}><CloseIcon/></IconButton>
                                        </Fragment>
                                    }}
                                />:
                                todo.name}
                        </TableCell>
                        <TableCell align="right">
                            <IconButton onClick={()=>{setEditIsShown(todo.id); setEditTodo(todo.name)}}>
                                <EditIcon/>
                            </IconButton>
                            <IconButton>
                                <DeleteIcon onClick={()=>{setDeleteConfirmationIsShown(true); setTodoToBeDeleted(todo)}}/>
                            </IconButton>
                        </TableCell>
                    </TableRow>
                ))
                }
            </TableBody>
        </Table>
            </form>
            {deleteConfirmationIsShown && (
                <DeleteDialog todo={todoToBeDeleted}
                              open={deleteConfirmationIsShown}
                              setDeleteConfirmationIsShown={setDeleteConfirmationIsShown}
                />
            )}
        </Fragment>
    );
}

export default TodoTable;