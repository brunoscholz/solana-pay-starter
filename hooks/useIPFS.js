const useIPFS = (hash, filename, isFolder = false) => {
  const uri = isFolder ? `/${filename}` : `?filename=${filename}`
  return `https://gateway.ipfscdn.io/ipfs/${hash}${uri}`
}

export default useIPFS
