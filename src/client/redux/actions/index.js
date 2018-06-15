const updateTitle = (text, slug) => async (dispatch) => {
  // do fetch here

  dispatch({
    type: 'UPDATE_TITLE',
    title: { text, slug },
  });
};

export default {
  updateTitle,
};
