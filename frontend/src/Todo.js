import React from 'react';

export class TodoList extends React.Component {
    constructor() {
        super();

        this.state = {
            tasks: [],
            temp: ""
        }
    }

    getAllTodos() {
        fetch('http://localhost:3000/get-todo-list')
            .then(res => res.json())
            .then(res => {
                this.setState({ tasks: res.todo });
            });
    }

    textLine = event => {
        this.setState({ temp: event.target.value });
    };

    addNewTask = () => {
        const temporaryTask = this.state.temp;
        fetch('http://localhost:3000/add-todo', {
            method: 'post',
            body: JSON.stringify({ "name": temporaryTask }),
            headers: { 'Content-Type': 'application/json' }
        })
            .then(resp => resp.json())
            .then(resp => {
                console.log("Object received");
                const newObject = { name: temporaryTask, id: resp.newId };
                this.setState({ tasks: [...this.state.tasks, newObject], temp: "" });
            });
    };

    renameTask = (id) => {
        // TODO: implement udpate of the data
        const answer = prompt("What is the new task?");
        fetch('http://localhost:3000/update-todo', {
            method: 'post',
            body: JSON.stringify({ id, name: answer }),
            headers: { 'Content-Type': 'application/json' }
        })
            .then(res => res.json())
            .then(res => {
                const updateTask = this.state.tasks.find((task) => task.id === id);
                updateTask.name = answer;
                this.setState({ tasks: this.state.tasks });
            });
    };

    deleteButton = (id) => {
        // TODO: implement removal of the data
        fetch('http://localhost:3000/delete-todo', {
            method: 'post',
            body: JSON.stringify({ id }),
            headers: { 'Content-Type': 'application/json' }
        })
            .then(resp => resp.json())
            .then(resp => {
                const updatedTasks = this.state.tasks.filter((task) => task.id !== id);
                this.setState({ tasks: updatedTasks });
                console.log('Object updated!');
            });
    };

    render() {
        return (
            <div>
                <input type="text" value={this.state.temp} onChange={this.textLine} />
                <button onClick={this.addNewTask}>Add task</button>
                <table>
                    <tbody>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Button</th>
                        </tr>
                        {this.state.tasks.map((task, idx) => (
                            <tr key={idx}>
                                <td>{task.id}</td>
                                <td>{task.name}</td>
                                <td>
                                    <button onClick={() => this.deleteButton(task.id)}>Delete</button>
                                    <button onClick={() => this.renameTask(task.id)}>Rename</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        )
    }
}
export default TodoList;