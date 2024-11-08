import Swal from "sweetalert2";
import { resetSuccessAction } from "../../redux/slices/globalActions/globalActions";
import { useDispatch } from "react-redux";

const SuccessMsg = ({ message }) => {
  //Dispatch
  const dispatch = useDispatch();
  Swal.fire({
    icon: "success",
    title: "Good job!",
    text: message,
  });
  dispatch(resetSuccessAction());
};

export default SuccessMsg;
