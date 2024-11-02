import Login from "../Users/Forms/Login";
const AdminRoute = ({ children }) => {
  //get user from local storage
  const user = JSON.parse(localStorage.getItem("userInfo"));
  const isAdmin = user?.userFound?.isAdmin ? true : false;
  if (!isAdmin) return <Login />;
  return <>{children}</>;
};

export default AdminRoute;
