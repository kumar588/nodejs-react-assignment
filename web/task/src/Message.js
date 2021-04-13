import React, { Component } from 'react';
import {Alert} from 'react-bootstrap'

class Message extends Component {
    constructor(props){
        super(props)

    }
    render() {
        return (
            <div>
                <Alert variant={this.props.variant} key={this.props.variant}>
                    <h3 className="text-center">{this.props.message}</h3>
                </Alert>
            </div>
        );
    }
}

export default Message;