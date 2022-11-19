import './App.css';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import ListEmployeeComponent from './Components/ListEmployeeComponent';
import HeaderComponent from './Components/HeaderComponent';
import FooterComponent from './Components/FooterComponent';
import CreateEmployeeComponent from './Components/CreateEmployeeComponent';
import ViewEmployeeComponent from './Components/ViewEmployeeComponent';

function App() {
  return (
    <div> 
      <Router> 
        <HeaderComponent/> 
        <div className="container">
            <Switch>
                <Route path="/" exact component={ListEmployeeComponent}></Route> 
                <Route path="/get-all-employees">{ListEmployeeComponent} </Route>  
                <Route path="/employees" component={ListEmployeeComponent}></Route>
                <Route path="/add-employee/:id" component={CreateEmployeeComponent}></Route>
                <Route path="/view-employee/:id" component={ViewEmployeeComponent}></Route>   
            </Switch>  
        </div>
        <FooterComponent/>
      </Router>  
    </div>  
  );
}

export default App;
