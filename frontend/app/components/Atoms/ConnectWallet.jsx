import React from 'react'
import toast from 'react-hot-toast';



const ConnectWallet = () => {
    const notify = () =>
        toast('FEATURE COMMING SOON>>>', {
            style: {
                display: 'flex',
                border: '1px solid #4F46E5',
                padding: '16px',
                color: 'green',
                background: '#F3F4F6',
                fontWeight: 'bold',
                fontSize: '16px',
            },
            icon: '🚀',
        });
  return (
    <button onClick={notify} className=''>Connect Wallet</button>
  )
}

export default ConnectWallet