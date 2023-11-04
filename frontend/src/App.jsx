import React from 'react';
import {Route,Routes} from 'react-router-dom' ; //Router={routes,route} are used so that user can go to diffrent page without refreshing 
import Home from './pages/Home';
import CreateBooks from './pages/CreateBooks';
import DeleteBooks from './pages/DeleteBooks';
import EditBooks from './pages/EditBooks';
import ShowBooks from './pages/ShowBooks';
//import background from './assets/bkstore.jpeg';
import background from './assets/bkimg.jpg';


const App = () => {
  return (
    <div style={{ backgroundImage: `url(${background})` , width: '100vw',
    height: '100vh',backgroundRepeat:'no-repeat' , backgroundSize:'cover' }}>
    <Routes>    
      <Route path='/' element={<Home/>}/>
      <Route path='/books/create' element={<CreateBooks/>}/>
      <Route path='/books/details/:id' element={<ShowBooks/>}/>
      <Route path='/books/edit/:id' element={<EditBooks/>}/>
      <Route path='/books/delete/:id' element={<DeleteBooks/>}/>
    </Routes>
    </div>
  )
  
}

export default App;