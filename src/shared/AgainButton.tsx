import React from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export interface AgainButtonProps {
  message: string
  refetch: () => void
}

export const AgainButton = ({ message, refetch }: AgainButtonProps) => {
  toast(message, { type: 'error' })
  return (
    <>
      {message}
      <button onClick={() => refetch()}>Попробовать снова</button>
      <ToastContainer />
    </>
  )
}
