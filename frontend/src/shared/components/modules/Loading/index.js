import classNames from 'classnames';
import { createContext, useContext, useState } from 'react';
import './style.scss';


const LoadingContext = createContext({
  loading: false,
  // eslint-disable-next-line
  setLoading: (loading) => {}
});

export const useLoading = () => useContext(LoadingContext);

export const Loading = ({ className }) => {
  return (
    <div className={classNames('lds-ripple', className)}><div></div><div></div></div>
  );
};

const LoadingProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);

  return (
    <LoadingContext.Provider value={{
      loading,
      setLoading
    }}>
      { children }
      { loading && <div className='loading-wrapper'>
        <Loading className='global' />
      </div> }
    </LoadingContext.Provider>
  );
};

export default LoadingProvider;
