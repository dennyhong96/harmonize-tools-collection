import { toast } from "react-toastify";

const dispatchToast = (msg, type = "ERROR") => {
  toast(msg, {
    position: "top-right",
    autoClose: 3500,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });

  // switch (type) {
  //   case "ERROR":
  //     toast.error(msg, {
  //       position: "top-right",
  //       autoClose: 5000,
  //       hideProgressBar: true,
  //       closeOnClick: true,
  //       pauseOnHover: true,
  //       draggable: true,
  //     });
  //     break;
  //   case "SUCCESS":
  //     toast.success(msg, {
  //       position: "top-right",
  //       autoClose: 2500,
  //       hideProgressBar: true,
  //       closeOnClick: true,
  //       pauseOnHover: true,
  //       draggable: true,
  //     });
  //     break;
  //   case "INFO":
  //     toast.info(msg, {
  //       position: "top-right",
  //       autoClose: 3500,
  //       hideProgressBar: true,
  //       closeOnClick: true,
  //       pauseOnHover: true,
  //       draggable: true,
  //     });
  //     break;
  //   default:
  //     break;
  // }
};

export default dispatchToast;
