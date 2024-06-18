const postReducer=(
    state={ posts: [], loading: false,error: false, uploading:false},
    action
)=>{

    switch(action.type){
        case 'Upload_start':
            return {...state,uploading:true, error:false}
        case 'Upload_success':
            return  {...state, uploading: false, posts: [action.data, ...state.posts], error: false }
        case 'Upload_failed':
            return { ...state, uploading: false, error: true }
        default:
             return state;
    }
}

export default postReducer;