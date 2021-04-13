import React from 'react';
import ReactDom from 'react-dom';
import Popup from 'react-popup';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form, Row, Col } from 'react-bootstrap';
import withLogger from './Logger';

class AddRootTask extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            title: '',
            dueDate: '',
            status: 'false'
        }
        
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCancel =  this.handleCancel.bind(this);
        }

    onSuccessSubmission(){
        this.setState({})
    }

  successPop(){
      console.log(`in popup`)

    let mySpecialPopup = Popup.register({
        title: 'I am special',
        content: 'Since I am special you might need me again later. Save me!',
        buttons: {
            left: ['cancel'],
            right: ['ok']
        }
    });
    
    Popup.queue(mySpecialPopup);
  }


    handleSubmit (event) {
       // console.log("event ", this.state);
       // console.log(JSON.stringify(this.state))
        fetch("http://localhost:8080/tasks",{
            method: "POST",
            body: JSON.stringify(this.state)
        }).then(response => response.json())
        .then(data =>{
          alert("Task been added successfully!")
            this.props.updateHomeState(data);
            // this.props.history.push("/");
       
        }
        )
        .catch(error => this.props.logger.error(error))
     //   event.preventDefault()
       
    }

    handleChange(event) {
        event.preventDefault()
        
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleCancel = ()=> {
       // this.props.history.push("/");

       this.props.hideRootDiv();
    }

    render() {
        return (
            <div>
                 <div id = "addRootTask" className="edit-task">
                 
                       Task Title: <input type = "text" name = "title" onChange = {this.handleChange}></input><br/>
                       Task Due Date: <input type = "date" name = "dueDate" onChange = {this.handleChange}></input><br/>
                       <Button variant="primary" type = "submit" onClick = {this.handleSubmit} >Add Task</Button>
                       <Button variant="secondary" onClick={this.handleCancel}>Cancel</Button>
                  
               </div>
               <div>
               {/* <Form>
               <Form.Group as={Row} controlId="formPlaintextPassword">
    <Form.Label column sm="2">
      Task Title
    </Form.Label>
    <Col sm="6">
      <Form.Control type="text" placeholder="Task Title" />
    </Col>
  </Form.Group>

  <Form.Group as={Row} controlId="formPlaintextPassword">
    <Form.Label column sm="2">
      Task Due Date
    </Form.Label>
    <Col sm="6">
      <Form.Control type="date" placeholder="Password" />
    </Col>
  </Form.Group>
  <Button variant="primary" type="submit">
    Submit
  </Button>
</Form> */}
               </div>
            </div>
        );
    }
}

export default withLogger(AddRootTask);
