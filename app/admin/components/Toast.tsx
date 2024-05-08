interface ToastProps {
  status: string;
  message: string;
}

const Toast: React.FC<ToastProps> = ({
  status,
  message
}) => {
  return (
    <div className="toast toast-top toast-center z-[100]">
      <div className={`alert alert-${status}`}>
        <span className={`${status === 'error' ? 'text-white' : 'text-slate-600'}`}>{message}</span>
      </div>
    </div>
  )
}

export default Toast