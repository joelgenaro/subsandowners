const initState = {
  email: "",
  password: "",
  isComplete: false,
  firstName: "",
  lastName: "",
  profile: "",
  salary: "",
  location: "",
  phone: "",
};

const candidateListReducer = (state = initState, action) => {
  switch (action.type) {
    case "CREATE_WITH_GMAIL":
      return { ...state, email: action.payload };

    default:
      return state;
  }
};

export default candidateListReducer;
