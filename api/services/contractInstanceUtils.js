module.exports = {
    getBlockScanContractInstance: () => {
        let abi = Abi.BlockScanAbi;
        let contractAddress = constUtiles.MainAddress;
        let contract = Web3.eth.contract(abi);
        let contractInstance = contract.at(contractAddress);
        return contractInstance;
    }

}