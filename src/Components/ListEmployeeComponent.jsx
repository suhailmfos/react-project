import React, { Component } from 'react'
import EmployeeService from '../Services/EmployeeService'

export default class ListEmployeeComponent extends Component {
    constructor(props){
        super(props)
        this.state = {
            employees: []
        }
        this.addEmployee = this.addEmployee.bind(this);
        this.viewEmployee = this.viewEmployee.bind(this);
        this.deleteEmployee = this.deleteEmployee.bind(this);
    }
    deleteEmployee(id){
        EmployeeService.deleteEmployee(id).then(res=>{
            this.setState({employee: this.state.employees.filter(employee => employee.id !== id)});
        });
        
    }
    componentDidMount(){
        EmployeeService.getEmployees().then((res) =>{
            this.setState({employees: res.data})
        });
    }
    editEmployee(id){
        this.props.history.push(`/add-employee/${id}`);
    }
    addEmployee(){
        this.props.history.push('/add-employee/_add');
    }
    viewEmployee(id){
        this.props.history.push(`/view-employee/${id}`);
    }
    render() {
        return (
            <div>
                <h2 className="employeeList text-center">Employee List</h2>
                <div className="row">
                    <button onClick={this.addEmployee} className="btn btn-primary button"> Add Employee</button>
                </div>    
                <div className="row">
                    <table>
                        <thead>
                            <tr>
                                <th>Employee Id</th>
                                <th>Employee First Name</th>
                                <th>Employee Last Name</th>
                                <th>Employee Email</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.employees.map(
                                    employee =>
                                    <tr key={employee.id}>
                                        <td>{employee.id}</td>
                                        <td>{employee.firstname}</td>
                                        <td>{employee.lastname}</td>
                                        <td>{employee.email}</td>
                                        <td style={{marginLeft: "10px"}} onClick={() => this.viewEmployee(employee.id)} className="btn btn-info">View</td>
                                        <td style={{marginLeft: "10px"}} onClick={() => this.editEmployee(employee.id)} className="btn btn-info">Update</td>
                                        <td style={{marginLeft: "10px"}} onClick={()=> this.deleteEmployee(employee.id)} className="btn btn-danger" >Delete</td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}
