import React, { Component } from 'react'
import EmployeeService from '../Services/EmployeeService';

export default class CreateEmployeeComponent extends Component {
    
    constructor(props){
        super(props)
        this.state = {
            id: this.props.match.params.id,
            firstname: '',
            lastname: '',
            email:''
        }
        this.changeFirstnameHandler = this.changeFirstnameHandler.bind(this);
        this.changeLastnameHandler = this.changeLastnameHandler.bind(this);
        this.changeEmailHandler = this.changeEmailHandler.bind(this);
        this.saveEmployee = this.saveEmployee.bind(this);
    }
    componentDidMount(){
        if(this.state.id === '_add'){
            return;
        }else{
            EmployeeService.getEmployeeById(this.state.id).then(res =>{
                let employee = res.data;
                this.setState({
                    firstname: employee.firstname,
                    lastname: employee.lastname,
                    email: employee.email
                })
            });
        }
    }
    saveEmployee = (e) => {
        e.preventDefault();
        let employee = {firstname: this.state.firstname, lastname: this.state.lastname, email: this.state.email}
        console.log('employee => ' + JSON.stringify(employee)); // for printing at console

        // now call create employee method from service class
        if(this.state.id === '_add'){
            EmployeeService.createEmployee(employee).then(res =>{
                this.props.history.push('/employees');
            });
        }else{
            EmployeeService.updateEmployee(employee, this.state.id).then(res =>{
                this.props.history.push(`/employees`);
            });
        }
    }
    cancel(){
        this.props.history.push('/employees');
    }
    changeFirstnameHandler = (event)=>{
        this.setState({firstname: event.target.value})
    }
    changeLastnameHandler = (event) =>{
        this.setState({lastname: event.target.value})
    }
    changeEmailHandler = (event) =>{
        this.setState({email: event.target.value})
    }
    addTitle(){
        if(this.state.id === "_add"){
            return <h3 className="text-center">Add Employee</h3>
        }
        else{
            return <h3 className="text-center"> Update Employee</h3>
        }
    }
    render() {
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="card col-md-6 offset-md-3 offset-md-3">
                            {
                                this.addTitle()
                            }
                            <div className="card-body">
                                <form>
                                    <div className="form-group">
                                        <label>First Name</label>
                                        <input placeholder="First Name" name="firstname" className="form-control"
                                        value={this.state.firstname} onChange={this.changeFirstnameHandler} />
                                        
                                    </div>
                                    <div className="form-group">
                                        <label>Last Name</label>
                                        <input placeholder="Last Name" name="lastname" className="form-control"
                                        value={this.state.lastname} onChange={this.changeLastnameHandler} />
                                    </div>
                                    <div className="form-group">
                                        <label>Email</label>
                                        <input placeholder="Email" name="email" className="form-control"
                                        value={this.state.email} onChange={this.changeEmailHandler} />
                                    </div>
                                    <button className="btn btn-success" onClick={this.saveEmployee}>Save</button>
                                    <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}>Cancel</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
