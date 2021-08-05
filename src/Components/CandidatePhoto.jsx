import axios from 'axios'
import React, { Component } from 'react'

export default class CandidatePhoto extends Component {

    state = {
        // initially no file is selected
        selectedFile: null
    }

    fileData = () => {
        if (this.state.selectedFile) {
          return (
            <div>
                <h2>File Details:</h2>
                <p>File Name: {this.state.selectedFile.name}</p>
                <p>File Type: {this.state.selectedFile.type}</p>
                <p>Last Modified:{" "}
                    {this.state.selectedFile.lastModifiedDate.toDateString()}
                </p>
            </div>
            );
        } else {
          return (
            <div>
              <br />
              <h4>Choose before Pressing the Upload button</h4>
            </div>
          );
        }
      };
    onFileChange = (event) =>{
        // update the state
        this.setState({selectedFile: event.target.files[0]});
    }  
    onFileUpload = () =>{
        // Create an object of formData
        const formData = new formData();
        // update the formData object
        formData.append(
            "myFile",
            this.state.selectedFile,
            this.state.formData.name
        );
        // Details of the uploaded files
        console.log(this.state.selectedFile);

        // request made by the backend api
        axios.post("api/uploadfile", formData);
    }
    render() {
        return (
            <div>
                <div>
                    <input type="file" onChange={this.onFileChange}/>
                    <button onClick={this.onFileUpload}>Upload!</button>
                </div>
                {this.fileData()}
            </div>
        )
    }
}
