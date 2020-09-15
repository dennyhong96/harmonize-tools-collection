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

export const savePdf = async (state) => {
  try {
    // ... Save to db here
    const res = await axios.post("/api/v1/form/nda", state.formDetails);
    console.log(res.data);

    console.log("save");
  } catch (error) {
    console.error(error);
  }
};

export const getUserForms = (state, payload) => {
  return {
    ...state,
    user: {
      forms: payload,
    },
  };
};
