import React from 'react';
import DateDiff from 'date-diff';
import { Table, Alert } from 'react-bootstrap';
import Message from './Message';
import withLogger from './Logger';

class Reminders extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            tasks: [],
            allTasks: []
        }
        this.props.logger.info('testing hoc reminders')
    }

    getAllTaksRecursive(tasks) {
       
        for (var i = 0; i < tasks.length; i++) {
            var today = new Date();
            //  tomorrow.setDate(new Date().getDate()+1);
            const dueDate = new Date(tasks[i].dueDate);
            var diff = new DateDiff(dueDate, today);


            if (diff.hours() <= 24 && diff.hours() >= 0 && tasks[i].status !== "true") {

                this.setState(prevState => ({
                    allTasks: [...prevState.allTasks, tasks[i]]
                }))
            }
            if (tasks[i].tasks) {

                this.getAllTaksRecursive(tasks[i].tasks);
            }

        }

    }
    componentDidMount() {
        this.props.logger.info('loading Home page');
        fetch('http://localhost:8080/tasks')
            .then(response => response.json())
            .then(data => {
                this.setState({ tasks: data });
                this.props.logger.info(this.state.tasks);
            })
            .then(tasks => {
                this.getAllTaksRecursive(this.state.tasks);
                this.props.logger.info(`all tasks in then `,this.state.tasks )
            })
            .catch(error => {
                this.props.logger.error(error);
            })
    }

    showMessage = () => {
        setTimeout(()=> {return "Hello"}, 5000 )
    }


    render() {
        return (
            <div>
                <br/><br/>
                <a href="/">Goto Home</a>
                <h3 className="text-center">Welcome to Reminders</h3>

                {/* <Message message="Hello Kumar!" variant="info" timeout={5000}/> */}

                {(this.state.allTasks.length) ?
                    <Table striped bordered hover>
                        <tbody>
                            <tr>
                                <th>TaskID</th>
                                <th>Task title</th>
                                <th>Task Status</th>
                                <th>Task Due Date</th>

                            </tr>
                            {this.state.allTasks.map(task => (

                                <tr>
                                    <td>{task.id}</td>
                                    <td>{task.title}</td>
                                    <td>{task.status === "true" ? "Done" : "Pending"}</td>
                                    <td>{task.dueDate}</td>
                                </tr>

                            ))}
                        </tbody>
                    </Table>
                    :
                    <div>
                        <Alert className="text-center" key="info" variant="info">
                            No task is to be completed in 24 hrs!.....
                        </Alert>

                    </div>}

            </div>
        );
    }
}
export default withLogger(Reminders);
