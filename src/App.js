
import { Route, Routes } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { ToastContainer } from 'react-toastify';
import { Home } from './components/Home';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AddContact } from './components/AddContact';
import { EditContact } from './components/EditContact';

function App() {
  const dispatch = useDispatch()
  useEffect(()=>{
   
    const getData = async () =>{
      const contactList=[]
      await fetch('https://jsonplaceholder.typicode.com/users/').then(res=>res.json())
      .then(data=>{
        data.map(contact=>(
          contactList.push({
            id: contact.id,
            name: contact.name,
            number: contact.phone,
            email: contact.email
          })
          ))
      })
      dispatch({type:'FETCH_CONTACTS', payload: contactList})
    }
    getData()
  })


  return (
    <div className="App">
      <ToastContainer/>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/add' element={<AddContact/>}></Route>
        <Route path='/edit/:id' element={<EditContact/>}></Route>
      </Routes>
    </div >
  );
}

export default App;
