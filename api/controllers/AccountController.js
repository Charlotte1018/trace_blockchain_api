/**
 * EmployeeController
 *
 * @description :: Server-side logic for managing employees
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    //acount
    createAccount: function (req, res) {
        let params = req.body;
        Web3.personal.newAccount(params.password);
        let newAddress = Web3.eth.accounts[Web3.eth.accounts.length - 1];
        res.send(Message.messages(1, '新建账户地址', newAddress));
    },
    getAccounts: function (req, res) {
        let params = req.query;
        let accounts = Web3.eth.accounts;
        res.send(Message.messages(1, '账户列表', accounts));
    },
    //getBalance
    getBalance: function (req, res) {
        let params = req.query;
        let balance = Web3.eth.getBalance(params.account);
        res.send(Message.messages(1, '账户余额', {
            balanceUnit: Web3.fromWei(balance, params.unit),
            balance: balance
        }));
    },
    transferAccount: function (req, res) {
        let params = req.body;
        let isAddress = Web3.isAddress(params.from) && Web3.isAddress(params.to);
        let unLock = Web3.personal.unlockAccount(params.from, params.password);
        if (!isAddress) return res.send(Message.messages(10001, '输入的地址不合法！', { isAddress }));
        if (!unLock) return res.send(Message.messages(10002, '输入的密码错误！', { unLock }));

        Web3.eth.sendTransaction({
            from: params.from,
            to: params.to,
            value: Web3.toWei(params.value),
            data: Web3.toHex(params.data) || `${params.value}ether`,
        }, (error, result) => {
            if (!error) {
                res.send(Message.messages(0, '交易哈希！', { 'transactionHash': result }));
            } else {
                res.send(Message.messages(10003, 'err', { info: error }));
            }
        });

    }

};

