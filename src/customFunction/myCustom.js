import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
 
const customFunc = WrappedComponent => props => {
  const params = useParams();
  const navigate = useNavigate();
 
  return (
    <WrappedComponent
      {...props}
      params={params}
      navigate={navigate}
    />
  );
};
 
export default customFunc;