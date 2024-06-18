const authReducer=(state={ authData:null, loading:false, error:false},action)=>
{
    switch(action.type){
        case 'Auth_start':
            return {...state, loading: false, error: false};
        case 'Auth_success':
            localStorage.setItem('profile', JSON.stringify({...action?.data}));
            return {...state, authData: action.data, loading:false, error:false};
        case 'Auth_fail':
            return {...state,  loading: false, error: true};
        case 'UPDATE_START':
            return {...state, updateLoding: true, error:false};
        case 'UPDATE_SUCCESS': 
            localStorage.setItem('profile',JSON.stringify({...action?.data}))
            return { ...state, authData: action.data, updateLoding: false, error: false};
        case 'UPDATE_FAILURE':
            return { ...state, updateLoding: false, error:true}
        case "FOLLOW_USER":
            return {...state, authData: {...state.authData, user: {...state.authData.user, following: [...state.authData.user.following, action.data]} }}
              
        case "UNFOLLOW_USER":
            return {...state, authData: {...state.authData, user: {...state.authData.user, following: [...state.authData.user.following.filter((personId)=>personId!==action.data)]} }}
        case 'LogOut':
            localStorage.clear();
            return {...state, authData: null,loading:false, error: false}
        default: return state;
    }
}

export default authReducer;