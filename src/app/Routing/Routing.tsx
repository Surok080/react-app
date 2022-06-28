import { Routes, Route, useNavigate } from 'react-router-dom';
import { Registration, Login, } from '../providers';



function Routing() {

  const navigate = useNavigate();

  return (
    <Routes>
      <Route
        path='/'
        element={<Login
          navigate={navigate}
        />} />
      <Route
        path='/registration'
        element={<Registration
          navigate={navigate}
        />} />
    </Routes>
  );

}
export default Routing;

