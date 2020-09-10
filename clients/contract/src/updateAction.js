import axios from "axios";

export default function updateAction(state, payload) {
  return {
    ...state,
    formDetails: {
      ...state.formDetails,
      ...payload,
    },
  };
}

export const savePdf = async () => {
  try {
    // ... Save to db here
    console.log("save");
  } catch (error) {
    console.error(error);
  }
};
