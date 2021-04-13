import React from 'react';
import { Button } from 'react-bootstrap';
import queryString from 'query-string';
import withLogger from './Logger'

class Edit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            title: '',
            dueDate: '',
            status: ''
        }
       
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleStatusChange = this.handleStatusChange.bind(this);
        this.handleDueDateChange = this.handleDueDateChange.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
    }

    componentDidMount(){
        
        let params = queryString.parse(this.props.location.search);
        this.props.logger.info('loading edit page', params.id);
    
        
        fetch(`http://localhost:8080/tasks/${params.id}`)
            .then(response => response.json())
            .then(data => {
                this.props.logger.info(data)
                this.setState({
                    id: data.id,
                    title: data.title,
                    dueDate: data.dueDate,
                    status: data.status
                })
                this.props.logger.info(this.state.id)

            })
            .catch(error => {
                this.props.logger.error(error);
            })
    }

    handleTitleChange(event) {
        //  event.preventDefault()

        this.setState({
            title: event.target.value
        });
    }

    handleStatusChange(event) {
        //  event.preventDefault()

        this.setState({
            status: event.target.value
        });
    }

    handleDueDateChange(event) {
        //  event.preventDefault()

        this.setState({
            dueDate: event.target.value
        });
    }
    handleUpdate(event) {
        this.props.logger.info(`in update ${this.state}`)
        fetch(`http://localhost:8080/tasks/${this.state.id}`, {
            method: "PUT",
            body: JSON.stringify(this.state)
        }).then(response => response.json())
            .then(data => {
                alert("Task has been successfully updated!")
                this.props.history.push("/");
              
               // this.props.updateHomeState(data);
                //    window.location.reload(true);
            }
            )
            .catch(error => console.log(error))
        //  event.preventDefault()
    }

    handleCancel = () =>{
        this.props.history.push("/");
    }

    render() {
      
        return (
            <div><br/><br/>
            <br/>
                <h3 className="text-center">Edit Page</h3>
               
                <div id="editTask" className="edit-task">
         
                        Task Title: <input type="text" name="title" defaultValue={this.state.title} onChange={this.handleTitleChange}></input><br />
                        Task Due Date: <input type="date" name="dueDate" defaultValue={this.state.dueDate} onChange={this.handleDueDateChange}></input><br />
                        Task Status: <input type="text" name="status" defaultValue={this.state.status} onChange={this.handleStatusChange}></input><br />
                        <Button variant="primary" type="submit" onClick={this.handleUpdate}>Update Task</Button>
                        <Button variant="secondary" type="cancel" onClick={this.handleCancel}>Cancel</Button>
              
                </div>
            </div>
        );
    }
}

export default withLogger(Edit);
