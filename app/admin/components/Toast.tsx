interface ToastProps {
  status: string;
  message: string;
}

const Toast: React.FC<ToastProps> = ({
  status,
  message
}) => {
  return (
    <div className="toast toast-top toast-center">
      <div className={`alert alert-${status}`}>
        <span>{message}</span>
      </div>
    </div>
  )
}

export default Toast