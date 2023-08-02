const initialState = []

export const contactReducer = (state=initialState, action) =>{
    switch(action.type){
        case 'FETCH_CONTACTS':
            return action.payload
        case 'DELETE_CONTACT':
            let filterList = state.filter(contact=>contact.id !== action.payload)
            return filterList
        case 'ADD_CONTACT':
            return [action.payload, ...state]
        case 'EDIT_CONTACT':
            let mapList = state.map(contact=> {
                if(contact.id === action.payload.id){
                    return action.payload
                }else{
                    return contact
                }
            })
            state = mapList
            return state
        default:
            return state
    }

}

export const contactSelector = state => state