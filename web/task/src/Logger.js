import React from 'react';
import { withRouter } from "react-router";

const withLogger = (PassedComponent) =>
    class WithLogger extends React.Component {
       
            info = (msg) => {
                console.log("INFO:", msg)
            };
            error = (e) => {
                console.log("ERROR:", e);
            }
       
 
        render() {
            return (
                <PassedComponent {...this.props} logger={{info:this.info, error:this.error}} />
            );
        }

    }

export default withLogger;