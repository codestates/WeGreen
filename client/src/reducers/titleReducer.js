import { CHANGE_TITLE } from '../actions/index';

const titleReducer = (state = { title: 'WeGreen' }, action) => {
  switch (action.type) {
    case CHANGE_TITLE:
      const htmlTitle = document.querySelector('title');
      htmlTitle.innerText = action.payload.title;
      return Object.assign({}, state, {
        ...action.payload,
      });
    default:
      return state;
  }
};

export default titleReducer;
