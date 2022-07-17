const useIPFS = (hash, filename) => {
return `https://gateway.ipfscdn.io/ipfs/${hash}/${filename}`
};

export default useIPFS;
