module.exports = {
    /**
     * 解锁账户
     * @param account
     * @param password
     * @returns {[*]}
     */
    unlockAccount: function (account, password) {
        return Web3.personal.unlockAccount(account, password);
    },
    accounts: () => {
        return Web3.eth.accounts;
    }


}