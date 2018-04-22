module.exports = {
    //--------------------------管理员------------------------------------------

    /**
     * 合约的基本信息（管理员地址，注册地址）
     * @param registerBasicInfo
     * @returns {[*]}
     */
    basicContractInfo: (req, res) => {
        let contractInstance = contractInstanceUtils.getMainContractInstance();
        let owner = contractInstance.owner.call();
        let register = contractInstance.register.call();
        let admin = contractInstance.admin.call();
        res.send(Message.messages(1, '合约基本信息', { owner, register, admin }));
    }
}
