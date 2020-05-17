import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import ButtonGroup from '@material-ui/core/ButtonGroup';

export class TodoList extends React.Component {
    constructor() {
        super();

        this.state = {
            tasks: [],
            temp: ""
        }
    }

    componentDidMount() {
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
                <form>
                    <TextField id="outlined-basic" label="Outlined" variant="outlined" value={this.state.temp} onChange={this.textLine} />
                    <Button variant="contained" color="primary" onClick={this.addNewTask}>Add task</Button>
                </form>
                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell align="right">NAME</TableCell>
                                <TableCell align="right">BUTTON</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.tasks.map((task, idx) => (
                                <TableRow key={idx}>
                                    <TableCell component="th" scope="row">
                                        {task.id}
                                    </TableCell>
                                    <TableCell align="right">{task.name}</TableCell>
                                    <TableCell align="right">
                                        <ButtonGroup color="primary" aria-label="outlined primary button group">
                                            <Button color="secondary" variant="contained" onClick={() => this.deleteButton(task.id)}>Delete</Button>
                                            <Button color="primary" variant="contained" onClick={() => this.renameTask(task.id)}>Rename</Button> 
                                        </ButtonGroup>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        )
    }
}
export default TodoList;