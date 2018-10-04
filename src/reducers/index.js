import { combineReducers } from 'redux';

import { authentication } from './authentication';
import { users } from './user';

const rootReducer = combineReducers({
  authentication,
  users,
});

export default rootReducer;
