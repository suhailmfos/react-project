import React, { Component } from 'react'
import EmployeeService from '../Services/EmployeeService'

export default class ViewEmployeeComponent extends Component {
    constructor(props){
        super(props)
        this.state = {
            id: this.props.match.params.id,
            employee: {},
            student: {}
        }
    }
    componentDidMount(){
        EmployeeService.getEmployeeById(this.state.id).then(res =>{
            this.setState({employee: res.data});
        });
    }
    gotoHome(){
        this.props.history.push('/employees');
    }
    render() {
        return (
            <div>
                <div className="card col-md-6 offset-md-3">
                    <h3 className="text-center">View Employee Details</h3>
                    <div className="card-body">
                        <div className="row">
                            <label>Employee Id: {this.state.employee.id}</label>
                            <div></div>
                            <label>Employee First Name: {this.state.employee.firstname}</label>
                            
                            <label>Employee Last Name: {this.state.employee.lastname} </label>
                            <label>Employee Email: {this.state.employee.email}</label>
                            <div>
                                <button className="btn btn-info" onClick={this.gotoHome.bind(this)}>Go to Home</button>
                            </div>
                        </div>    
                    </div>    
                </div>     
            </div>
        )
    }
}
