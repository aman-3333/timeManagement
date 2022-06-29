// import logo from './logo.svg';
// import './App.css';

import CreateData  from './components/CreateData';
import EditProduct from './components/EditProduct';

import {BrowserRouter, Switch, Route} from 'react-router-dom';
import UserCreateData from "./components/UserCreateData";


function App() {
  return (

<BrowserRouter>
    <div className="App">

      
<Switch>  
          <Route exact path="/" component={CreateData} />
          <Route exact path="/user" component={UserCreateData} />
          {/* in given path we get our EditProduct Component */}

          <Route exact path="/updateProduct/editID/:id" component={EditProduct} />

  </Switch>
    
    </div>
    </BrowserRouter> 

  );
}

export default App;
