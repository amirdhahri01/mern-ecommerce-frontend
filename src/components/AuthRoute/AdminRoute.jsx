import { useDispatch, useSelector } from "react-redux";
import Login from "../Users/Forms/Login";
import { useEffect } from "react";
import { getUserProfileAction } from "../../redux/slices/users/usersSlice";
const AdminRoute = ({ children }) => {
  //Dispatch
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserProfileAction());
  }, [dispatch]);
  //get user from local storage
  const { userAuth } = useSelector((state) => state?.users);
  const isAdmin = userAuth?.userFound?.isAdmin;
  if (!isAdmin) return <Login />;
  return <>{children}</>;
};

export default AdminRoute;
