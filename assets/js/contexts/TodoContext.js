import React, {Component, createContext} from 'react';
import axios from 'axios';

export const TodoContext = createContext();

class TodoContextProvider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todos: []
        };
        this.readTodo()
    }

    //create
    createTodo(e,todo){
        e.preventDefault();
        axios.post('/api/todo/create', todo)
            .then(response=>{
                console.log(todo);
                let data = [...this.state.todos];
                data.push(response.data.todo);
                this.setState({
                    todos: data
                })
            }).catch(err=>{
                console.log(err);
        })
    }

    //read
    readTodo(){
        axios.get('/api/todo/read')
            .then(response=> {
                this.setState({
                    todos: response.data
                })
            }).catch(err=> console.log(err))
    }

    //delete
    deleteTodo(data){
        axios.delete('/api/todo/delete/' + data.id, data)
            .then(
                response=>{
                    let todos = [...this.state.todos]
                    console.log(todos)
                    let todo = todos.find(todo=> todo.id===data.id)
                    todos.splice(todos.indexOf(todo), 1)
                    console.log(todo)
                    this.setState({
                        todos: todos
                    })
                }
            ).catch(
                err=> console.log(err)
        )
    }

    //update
    updateTodo(data){
        axios.put('/api/todo/update/' + data.id, data)
            .then(
                response => {
                    let todos = [...this.state.todos]
                    let todo = todos.find(todo=>{
                        return todo.id === data.id;
                    })

                    todo.name = data.name;
                    this.setState({
                        todos: todos
                    })
                }
            ) .catch(
                err=> console.log(err)
        )

    }



    render() {
        return (
            <TodoContext.Provider value = {{
                ...this.state,
                createTodo: this.createTodo.bind(this),
                updateTodo: this.updateTodo.bind(this),
                deleteTodo: this.deleteTodo.bind(this),
            }}>
                {this.props.children}
            </TodoContext.Provider>
        );
    }
}

export default TodoContextProvider;