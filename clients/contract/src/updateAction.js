export default function updateAction(state, payload) {
    return {
      ...state,
      formDetails: {
        ...state.formDetails,
        ...payload
      }
    };
  }
  