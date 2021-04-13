import React from 'react';
import Edit from './Edit';
import AddRootTask from './AddRootTask';
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import AddSubTask from './AddSubTask';
import ReactDom from 'react-dom';
import Popup from 'react-popup';
import TasksView from './TasksView';
import TaskList from './TaskList';
import { Button, Table } from 'react-bootstrap';
import Logger from './Logger'


class Home extends React.Component {

    constructor() {
        super();
        this.state = {

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

                this.setState({
                    flag: false,
                    isEdit: false,
                    taskToEdit: {},
                    taskIdToDelete: '',
                    addSubTask: false,
                    tasks: data
                });
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

    updateHomeState = (data) => {
        console.log('back to Home')
        this.setState({ flag: false });
        this.setState({ tasks: data })
    }

    hideRootDiv = () => {
        this.setState({ flag: false })
    }


    render() {
        return (

            <div>

                {/* <div className='container'>
        <button onClick={this.submit}>Confirm dialog</button>
      </div> */}
                <h3 className="text-center">Home Page!!</h3>



                <div className="add-root-task">
                    <Button onClick={() => this.renderAddTask()}>Add Root Task</Button>
                </div>

                <div>
                    {this.state.flag ? <AddRootTask updateHomeState={this.updateHomeState} hideRootDiv={this.hideRootDiv} /> : ""}
                </div>

                {/*

                <div>
                    {this.state.isEdit ? <Edit task={this.state.taskToEdit} /> : ""}
                </div>

                <div>
                    {this.state.addSubTask ? <AddSubTask task={this.state.taskToEdit} /> : ""}
                </div> */}

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
                <div className="heading-div">
                    <Table>
                        <thead >
                            <tr>
                                <th>Task Id</th>
                                <th>Task Title</th>
                                <th>Task Status</th>
                                <th>Task Duedate</th>
                            </tr>
                        </thead>
                    </Table>
                </div>
                <div>
                    <TaskList tasks={this.state.tasks} updateHomeState={this.updateHomeState} />
                </div>
            </div>
        );
    }
}

export default Home;
