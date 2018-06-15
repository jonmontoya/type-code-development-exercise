const initialState = {
  text: '',
  slug: '',
};

const account = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_TITLE':
      return action.title;
    default:
      return state;
  }
};

export default account;
