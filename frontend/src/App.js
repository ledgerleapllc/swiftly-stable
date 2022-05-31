import Routes from 'routes';
import LoadingProvider from 'shared/components/modules/Loading';
import { DialogProvider } from 'shared/components/partials/Dialog/Provider';
import { ToastContainer } from 'react-toastify';

const contextClass = {
  success: 'bg-success',
  default: 'bg-primary',
};

function App() {
  return (
    <main className='app h-screen'>
      <LoadingProvider>
        <DialogProvider>
          <Routes />
          <ToastContainer
            style={{ minWidth: 400 }}
            icon={false}
            closeButton={false}
            toastClassName={({ type }) =>
              contextClass[type || 'default'] + ' relative flex justify-between overflow-hidden cursor-pointer mb-2'
            }
            bodyClassName={() => 'text-sm text-white font-semibold block py-3 px-5 whitespace-nowrap'}
            position='bottom-right'
            autoClose={3000}
            hideProgressBar
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss={false}
            draggable={false}
            pauseOnHover={false}
          />
        </DialogProvider>
      </LoadingProvider>
    </main>
  );
}

export default App;
