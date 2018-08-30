import {FETCH_POSTS,FETCH_POST,DELETE_POST} from '../actions';
import _ from 'lodash';


export default function(state={},action){

  switch(action.type)
  {
    case FETCH_POST:
    //[action.payload.data.id] is not array but it is used as key
      return {...state,[action.payload.data.id]:action.payload.data};
    case FETCH_POSTS:
      console.log(action.payload.data);
  //mapKeys from lodash is used to create key value pais with id as key and action.payload.data as values each
      return _.mapKeys(action.payload.data,'id');
    case DELETE_POST:
      return _.omit(state,action.payload);
    default:
        return state;
  }
}

//omit is used to update our state, since the post is not removed from our state, though it is deleted at api side
