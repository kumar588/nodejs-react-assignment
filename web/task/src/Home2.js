import React from 'react';
import Edit from './Edit';
import AddRootTask from './AddRootTask';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import AddSubTask from './AddSubTask';
import ReactDom from 'react-dom';
import Popup from 'react-popup';
import TasksView from './TasksView';
import TaskList from './TaskList';


class Home2 extends React.Component {

    constructor() {
        super();
        this.state = {
            subTasks: [],
            flag: false,
            isEdit: false,
            taskToEdit: {},
            taskIdToDelete: '',
            addSubTask: false,
            tasks: []
        };
    }

    // mapResponseToTasks(data){
    //     console()
    //     const allTasks = data.map(task => ({
    //         id: task.id,
    //         title: task.title,
    //         status: task.status,
    //         dueDate: task.dueDate,
    //        // subTasks: tasks

    //     }));
    //     this.setState({ tasks: allTasks });
    // }

    componentDidMount() {
        console.log('loading Home page');
        fetch('http://localhost:8080/tasks')
            .then(response => response.json())
            .then(data => {
                console.log(data)
                // const allTasks = data.map(task => ({
                //     id: task.id,
                //     title: task.title,
                //     status: task.status,
                //     dueDate: task.dueDate
                // }));
                this.setState({ tasks: data });
                console.log(this.state.tasks);

            })
            .catch(error => {
                console.log(error);
            })

    }

    renderAddTask() {
        console.log(this);
        this.setState({ flag: true });
        this.setState({ isEdit: false });
        this.setState({ addSubTask: false })
    }

    handleEditTask(task) {
        console.log('in edit task');
        this.setState({ isEdit: true });
        this.setState({ addSubTask: false })
        this.setState({ flag: false })
        this.setState({ taskToEdit: task })


    }

    deleteTask() {
        console.log(`in deleteTask ${this.state.taskIdToDelete}`)
        fetch(`http://localhost:8080/tasks/${this.state.taskIdToDelete}`, {
            method: "DELETE"
        }).then(response => response.json())
            .then(data => {
                // const allTasks = data.map(task => ({
                //     id: task.id,
                //     title: task.title,
                //     status: task.status,
                //     dueDate: task.dueDate
                // }));

                this.setState({ tasks: data });
                console.log(`in deelteTask`)
                this.props.history.push("/");
                window.location.reload(true);

            }
            )
            .catch(error => console.log(error))
    }

    handleDeleteTask = (id) => {
        console.log('in handleDeleteTask' + id);
        this.setState({ taskIdToDelete: id })

        confirmAlert({
            title: 'Confirm to submit',
            message: 'Are you sure to do this.',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => this.deleteTask()
                },
                {
                    label: 'No',
                    onClick: () => this.props.history.push("/")

                }
            ]
        });

        this.setState({ taskIdToDelete: id });

    }

    handleAddSubTask(task) {
        this.setState({ taskToEdit: task });
        this.setState({ addSubTask: true })
        this.setState({ flag: false });
        this.setState({ isEdit: false });

    }

    handleViewSubTasks(task) {

        return <tr>
        <td>{task.id}</td>
        <td>{task.tasks ? <a href="#" onClick={this.handleViewSubTasks}>{task.title}</a> : task.title}</td>
        <td>{task.status === "true" ? "Done" : "Pending"}</td>
        <td>{task.dueDate}</td>
        <td>
            <div>
                <a href="#" onClick={() => this.handleEditTask(task)}>Edit</a>
            </div>
            <div>
                <a href="#" onClick={() => this.handleDeleteTask(task.id)}>Delete</a>
            </div>
            <div>
                <a href="#" onClick={() => this.handleAddSubTask(task)}>Add SubTask</a>
            </div>
        </td>
    </tr>

    }

    // submit = (id) => {
    //     console.log(`in submit ${id}`)
    //     confirmAlert({
    //       title: 'Confirm to submit',
    //       message: 'Are you sure to do this.',
    //       buttons: [
    //         {
    //           label: 'Yes',
    //           onClick: () => alert(id)
    //         },
    //         {
    //           label: 'No',
    //           onClick: () => alert('Click No')
    //         }
    //       ]
    //     });
    //   };



    render() {
        return (

            <div>

                {/* <div className='container'>
        <button onClick={this.submit}>Confirm dialog</button>
      </div> */}
                <p>Home Page!!</p>


                <button onClick={() => this.renderAddTask()}>Add Root</button>

                <div>
                    {this.state.flag ? <AddRootTask /> : ""}
                </div>

                <div>
                    {this.state.isEdit ? <Edit task={this.state.taskToEdit} /> : ""}
                </div>

                <div>
                    {this.state.addSubTask ? <AddSubTask task={this.state.taskToEdit} /> : ""}
                </div>

                {/* {(this.state.tasks.length) ?
                    <table border="1">
                        <tbody>
                            <tr>
                                <th>TaskID</th>
                                <th>Task title</th>
                                <th>Task Status</th>
                                <th>Task Due Date</th>
                                <th>Action</th>
                            </tr>
                            {this.state.tasks.map(task => (
                                <tr>
                                    <td>{task.id}</td>
                                    <td>{task.tasks ? <a href="#" onClick={this.handleViewSubTasks}>{task.title}</a> : task.title}</td>
                                    <td>{task.status === "true" ? "Done" : "Pending"}</td>
                                    <td>{task.dueDate}</td>
                                    <td>
                                        <div>
                                            <a href="#" onClick={() => this.handleEditTask(task)}>Edit</a>
                                        </div>
                                        <div>
                                            <a href="#" onClick={() => this.handleDeleteTask(task.id)}>Delete</a>
                                        </div>
                                        <div>
                                            <a href="#" onClick={() => this.handleAddSubTask(task)}>Add SubTask</a>
                                        </div>
                                    </td>
                                </tr>
                                
                            ))}

                        </tbody>
                    </table>
                    :
                    <div>
                        <h3>No tasks to display!.....</h3>
                    </div>} */}
                    
                    <div>
                <TaskList tasks={this.state.tasks} />
                </div>
            </div>
        );
    }
}

export default Home
