interface ToastProps {
  status: string;
  message: string;
}

const Toast: React.FC<ToastProps> = ({
  status,
  message
}) => {
  return (
    <div className="toast toast-top toast-center z-[100] flex justify-center items-center">
      <div className={`alert ${status === 'error' ? 'alert-error' : 'alert-success'} shadow-lg`}>
        <div className="flex items-center">
          {status === 'error' ? (
            <svg className="w-6 h-6 text-red-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-12.728 12.728m0-12.728l12.728 12.728"></path>
            </svg>
          ) : (
            <svg className="text-white animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zM12 20a8 8 0 100-16v4a4 4 0 110 8z"></path>
            </svg>
          )}
          <span className={`text-white ${status === 'error' ? 'text-red-600' : 'text-green-600'} flex`}>
            {message}
          </span>
        </div>
      </div>
    </div>
  )
}

export default Toast