import { useSelector } from 'react-redux';
import {Outlet ,Navigate} from 'react-router-dom'
export default function OnlyAdminPriveteRouter() {
    const {currentUser}= useSelector(state => state.user);
  return currentUser.isAdmin ? <Outlet /> : <Navigate to='/sign-in' />;
}
