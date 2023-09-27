import { ReactElement } from 'react';
import { useLocation, Navigate } from 'react-router-dom';

import { getItemFromLS } from '../services/serviceLS';

function RequireAuth({ children }: { children: ReactElement }) {
  const location = useLocation();
  const auth = !!getItemFromLS('tokenAPI');

  if (!auth) {
    return <Navigate to="/sign-up" state={{ from: location }} />;
  }
  return children;
}

export default RequireAuth;
