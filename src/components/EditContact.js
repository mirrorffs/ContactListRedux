import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { contactSelector } from "../redux/contactReducer";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

export const EditContact = ()=>{
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [number, setNumber] = useState('');
    const {id} = useParams()
    const contacts = useSelector(contactSelector);
    const contactExist = contacts.find(contact => contact.id === parseInt(id))

    useEffect(()=>{
        if(contactExist){
            setName(contactExist.name);
            setEmail(contactExist.email);
            setNumber(contactExist.number);
        }
    },[contactExist])

    const handelSubmit = (e)=>{
        e.preventDefault();
        const contact = {
            id: parseInt(id),
            name,
            email,
            number
        }
        dispatch({type: 'EDIT_CONTACT', payload: contact})
        toast.success("Contact updated successfully!")
        navigate('/');
    }


    return(
        <div className='container'>
            {
                contactExist ? (
                    <>
                        <h1 className='display-3 text-center fw-bold'>Edit Contact {id}</h1>
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
                                        <input  type='submit' value='Update Contact' className='btn btn-dark' />
                                        <Link to='/' className='btn btn-danger ms-3 '>Cancel</Link>
                                    </div>
                                </form>
                            </div>
                        </div >
                    </>
                ) : (
                    <h1 className='display-3 my-5 text-center fw-bold'>Contact with id {id} does not exists!!</h1>
                )
            }

        </div >
    )
}