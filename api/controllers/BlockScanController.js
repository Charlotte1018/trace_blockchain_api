module.exports = {
    //基础信息
    basicContractInfo: (req, res) => {
        // let unlock = Web3.personal.unlockAccount(account, password);
        let contractInstance = contractInstanceUtils.getBlockScanContractInstance();
        let userNum = contractInstance.userNum.call();
        let txsNum = contractInstance.txsNum.call();
        res.send(Message.messages(1, '合约基础信息', { userNum, txsNum }));
    },
    regs: (req, res) => {
        let params = req.body;
        let account = params.account;
        let password = params.password;
        let unlock = Web3.personal.unlockAccount(account, password);
        let contractInstance = contractInstanceUtils.getBlockScanContractInstance();
        // let txsNum = contractInstance.txsNum.call();
        // res.send(Message.messages(1, '合约基础信息', { unlock, txsNum }));
        //Stroage,Transfer,Transport,Quality,Supervision
        //仓储，加工，运输，质检，监管
        //0,1,2,3,4
        contractInstance.register(
            params._nickName,
            params._type,
            {
                from: account,
                gas: 10000000
            },
            (error, result) => {
                if (error) return res.send(Message.messages(0, '出错了', error));
                return res.send(Message.messages(1, '交易哈希', { transactionHash: result }));
            }
        );
    },
    stockIn: (req, res) => {
        let params = req.body;
        let account = Web3.eth.accounts[params._type];
        let password = '1';
        let unlock = Web3.personal.unlockAccount(account, password);
        let contractInstance = contractInstanceUtils.getBlockScanContractInstance();
        contractInstance.testStockIn(
            {
                from: account,
                gas: 800000
            },
            (error, result) => {
                // console.log(error);
                if (error) { return res.send(Message.messages(0, '出错了', error)); }
                return res.send(Message.messages(1, '交易哈希', { transactionHash: result }));
            }
        );
    },
    stockOut: (req, res) => {
        let params = req.body;
        let account = Web3.eth.accounts[params._type];
        let password = '1';
        let unlock = Web3.personal.unlockAccount(account, password);
        let contractInstance = contractInstanceUtils.getBlockScanContractInstance();
        contractInstance.testStockOut(
            {
                from: account,
                gas: 10000000
            },
            (error, result) => {
                if (error) return res.send(Message.messages(0, '出错了', error));
                return res.send(Message.messages(1, '交易哈希', { transactionHash: result }));
            }
        );
    },
    quality: (req, res) => {
        let params = req.body;
        let account = Web3.eth.accounts[5];
        let password = '1';
        let unlock = Web3.personal.unlockAccount(account, password);
        let contractInstance = contractInstanceUtils.getBlockScanContractInstance();
        contractInstance.testQuality(
            {
                from: account,
                gas: 10000000
            },
            (error, result) => {
                if (error) return res.send(Message.messages(0, '出错了', error));
                return res.send(Message.messages(1, '交易哈希', { transactionHash: result }));
            }
        );
    },
    transfer: (req, res) => {
        let params = req.body;
        let account = Web3.eth.accounts[2];
        let password = '1';
        let unlock = Web3.personal.unlockAccount(account, password);
        let contractInstance = contractInstanceUtils.getBlockScanContractInstance();
        contractInstance.testTransport(
            {
                from: account,
                gas: 10000000
            },
            (error, result) => {
                if (error) return res.send(Message.messages(0, '出错了', error));
                return res.send(Message.messages(1, '交易哈希', { transactionHash: result }));
            }
        );
    }
}