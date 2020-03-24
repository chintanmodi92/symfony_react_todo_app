import React, {Component, createContext} from 'react';

export const TodoContext = createContext();

class TodoContextProvider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todos: [
                {name: 'do something'},
                ]
        };
    }

    //create
    createTodo(e,todo){
        e.preventDefault();
        let data = [...this.state.todos];
        data.push(todo);
        this.setState(
            {todos: data}
        );
        
    }

    //read
    readTodo(){

    }

    //delete
    deleteTodo(){

    }

    //update
    updateTodo(){

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