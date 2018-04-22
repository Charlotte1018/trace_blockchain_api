module.exports = {
    /**
     * POST  register
     * 企业注册信息
     * @param register(bytes32 e_name,bytes32 e_socialCode,uint e_nature)
     * @returns {[*]}
     */
    registers: (req, res) => {
        let param = req.body;
        let params = {
            e_name: Web3.fromAscii(param.e_name),
            e_socialCode: Web3.fromAscii(param.e_socialCode),
            e_nature: param.e_nature
        }
        let account = Web3.eth.accounts[0];
        console.log(account);
        let password = '1';
        let unlock = Web3.personal.unlockAccount(account, password);
        let contractInstance = contractInstanceUtils.getMainContractInstance();
        contractInstance.register(
            1,
            1,
            1,
            {
                from: account,
                gas: 10000000
            },
            (error, result) => {
                if (error) return res.send(Message.messages(0, '出错了', error));
                return res.send(Message.messages(1, '交易哈希', { transactionHash: result }));
            })
    }
}
