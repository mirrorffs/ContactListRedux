import { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { contactSelector } from "../redux/contactReducer";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


export const AddContact =()=>{
    const dispatch = useDispatch()
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [number, setNumber] = useState(''); 
    const contacts = useSelector(contactSelector)
    const navigate = useNavigate()
    const handelSubmit=(e)=>{
        e.preventDefault()

        let emailExist = contacts.find(contacts=>contacts.email === email)
        let numberExist = contacts.find(contacts=>contacts.number === number)

        if(emailExist&&numberExist){
            return toast.warning('Contact exists!')
        }
        const contact = {
            id: contacts[contacts.length - 1].id + 1,
            name,
            email,
            number
        }

        dispatch({type: 'ADD_CONTACT', payload: contact})
        toast.success("Contact added successfully!")
        navigate('/')
    }

    return(
       <div className='container'>
            <h1 className='display-3 text-center fw-bold'>Add Contact</h1>
            <div className='row'>
                <div className='col-md-6 shadow mx-auto p-5'>
                    <form className='text-center' onSubmit={handelSubmit}>
                        <div className='form-group mb-3'>
                            <input required type='text' placeholder='Name' className='form-control'
                                value={name} onChange={e => setName(e.target.value)} />
                        </div>
                        <div className='form-group mb-3'>
                            <input required type='email' placeholder='Email' className='form-control'
                                value={email} onChange={e => setEmail(e.target.value)} />
                        </div>
                        <div className='form-group mb-3'>
                            <input required type='number' placeholder='Phone Number' className='form-control'
                                value={number} onChange={e => setNumber(e.target.value)} />
                        </div>
                        <div className='form-group mb-3'>
                            <input type='submit' value='Add Contact' className='btn btn-block btn-dark' />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}