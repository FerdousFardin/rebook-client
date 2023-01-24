export default function usersReducer(state, action) {
  switch (action.type) {
    case "MAKE_ADMIN":
      return { ...state, [action.field]: action.payload };
    default:
      return state;
  }
}
