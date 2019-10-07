const initialState = {
  bgcolor: [26, 86, 17] //RGB values
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE_BACKGROUND":
      return {
        bgcolor: action.bgcolor
      };
    default:
      return state;
  }
};
