const initialState = {
  bgcolor: [0, 0, 0] //RGB values
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
