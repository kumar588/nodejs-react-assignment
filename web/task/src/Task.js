import React, { Component } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import { withRouter } from "react-router";
import Edit from './Edit'
import AddSubTask from './AddSubTask';
import {Button} from 'react-bootstrap';
import withLogger from './Logger';

class Task extends Component {
    constructor(props) {
        super(props)
        this.state = {
            taskIdToDelete: '',
            isEdit: false,
            taskToEdit: {},
            addSubTask: false
        }

    }

    handleAddSubTask(task) {
        this.setState({ taskToEdit: task });
        this.setState({ addSubTask: true })
        this.setState({ isEdit: false });

    }

    handleEditTask(task) {
        console.log('in edit task');
        this.props.history.push(`/edit?id=${task.id}`)
        this.setState({ isEdit: true });
        this.setState({ addSubTask: false })
        this.setState({ flag: false })
        this.setState({ taskToEdit: task })


    }
    deleteTask() {
        this.props.logger.info(`in deleteTask ${this.state.taskIdToDelete}`)
        fetch(`http://localhost:8080/tasks/${this.state.taskIdToDelete}`, {
            method: "DELETE"
        }).then(response => response.json())
            .then(data => {
                alert("Task been deleted successfully!")
                this.props.updateHomeState(data);

            }
            )
            .catch(error =>  this.props.logger.error(error))
    }

    handleDeleteTask = (id) => {
        this.props.logger.info('in handleDeleteTask' + id);
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

        // this.setState({ taskIdToDelete: id });

    }



    render() {
        return (
            <div>
                <div>
                    {this.state.addSubTask ? <AddSubTask task={this.state.taskToEdit} updateHomeState={this.props.updateHomeState} /> : ""}
                </div>
                <div>
                    {this.state.isEdit ? <Edit task={this.props.task} /> : ""}
                </div>

                <div>
                    <li className="li-row">
                        <div className="margin-div">
                            {this.props.task.id}
                        </div>
                        <div className="margin-div">
                            {this.props.task.title}
                        </div>
                        <div className="margin-div">
                            {this.props.task.status === "true" ? "Done" : "Pending"}
                        </div>
                        <div className="margin-div">
                            {this.props.task.dueDate}
                        </div>
                        <div className="margin-div">
                            <Button variant="secondary" onClick={() => this.handleEditTask(this.props.task)}>Edit</Button>
                        </div>
                        <div className="margin-div">
                            <Button variant="secondary" onClick={() => this.handleDeleteTask(this.props.task.id)}>Delete</Button>
                        </div>
                        <div className="margin-div">
                            <Button variant="secondary" onClick={() => this.handleAddSubTask(this.props.task)}>Add SubTask</Button>
                        </div>
                    </li>
                </div>

            </div>

        );
    }
}

export default withLogger(withRouter(Task));