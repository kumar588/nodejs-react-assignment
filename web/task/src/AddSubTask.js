import React from 'react';
import withLogger from './Logger'

class AddSubTask extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            title: '',
            dueDate: '',
            status: 'false'
        }
      
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    onSuccessSubmission() {
        this.setState({})
    }


    handleSubmit(event) {
        this.props.logger.info(`in subtask ${this.props.task.id}`);
        // console.log(JSON.stringify(this.state))
        fetch(`http://localhost:8080/tasks/${this.props.task.id}`, {
            method: "POST",
            body: JSON.stringify(this.state)
        }).then(response => response.json())
            .then(data => {
                this.props.updateHomeState(data);
                // this.props.history.push("/")
                // window.location.reload(true)
            }
            )
            .catch(error => this.props.logging.error(error))
        //   event.preventDefault()

    }

    handleChange(event) {
        event.preventDefault()

        this.setState({
            [event.target.name]: event.target.value
        });
    }

    render() {
        return (
            <div>
                <div id="addSubTask">
                    <form onSubmit={this.handleSubmit}>
                        Parent Task : <input type="text" name="parentId" value={this.props.task.title} readOnly></input><br />
                        Task Title: <input type="text" name="title" onChange={this.handleChange}></input><br />
                        Task Due Date: <input type="date" name="dueDate" onChange={this.handleChange}></input><br />
                        <button type="submit">Add SubTask</button>
                        <button type="cancel">Cancel</button>
                    </form>
                </div>

                {/* {
                   showMessage ? 
                   <div>
                       <h3>Task has been added successfully...</h3>
                   </div>
                   : ""
               } */}
            </div>
        );
    }
}

export default withLogger(AddSubTask);
