const initialState = {
  bgcolor: [26, 86, 17] //RGB values
};

export default (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    case "UPDATE_BACKGROUND":
      return {
        bgcolor: action.bgcolor
      };
    default:
      return state;
  }
};
