import React from 'react'
import useIPFS from '../hooks/useIPFS'

const IPFSDownload = ({ hash, filename, isFolder=false }) => {
  const file = useIPFS(hash, filename, isFolder)

  return (
    <div>
      {file ? (
        <div className='download-component'>
          <a className='download-button' href={file}>
            Download
          </a>
        </div>
      ) : (
        <p>Downloading file...</p>
      )}
    </div>
  )
}

export default IPFSDownload
