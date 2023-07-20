import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export interface AgainButtonProps {
  message: string
  refetch: () => void
}

export const AgainButton = ({ message, refetch }: AgainButtonProps) => {
  toast(message, { type: 'error' })
  const onClick = () => {
    refetch()
    window.location.reload()
  }
  return (
    <>
      {message}
      <button onClick={onClick}>Попробовать снова</button>
      <ToastContainer />
    </>
  )
}
