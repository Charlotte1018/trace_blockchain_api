module.exports = {
    //--------------------------管理员------------------------------------------

    /**
     * POST  auditRegister
     * 管理员审核企业注册信息
     * @param auditRegister(bytes32 e_name,uint _statusCode)
     * //0:审核通过1:审核不通过
     * @returns {[*]}
     */
    auditRegister: (req, res) => {
        let web3 = web3j.web3();
        let contractInstance = contractInstanceUtils.getMainContractInstance();
        let param = req.body;
        let unlock = web3.personal.unlockAccount(param.account, param.password);
        let isAddress = web3.isAddress(param.account);
        let administrator = contractInstance.administrator.call();
        let isAdmin = administrator==param.account;
        console.log(administrator);
        let params = {
            e_name: web3.fromAscii(param.e_name),
            _statusCode: param._statusCode
        };
        if (isAddress) {
            if(administrator===param.account){
                if (unlock) {
                    contractInstance.auditRegister(
                        params.e_name,
                        params._statusCode,
                        {
                            from: param.account,
                            gas: 10000000
                        },
                        (error, result) => {
                            if (!error) {
                                res.send({
                                    code: 0,
                                    data: {
                                        'transactionHash': result
                                    }
                                });
                                let transactionHash = result;
                            } else {
                                res.send({
                                    code: 10003,
                                    info: error
                                });
                            };
                        }
                    );
                } else {
                    res.send({
                        code: 10002,
                        info: '密码有误，请重新输入'
                    });
                }
            }else{
                res.send({
                    code: 10004,
                    info: '您不是管理员，没有权限操作！'
                });
            }
            
        } else {
            res.send({
                code: 10001,
                info: '账户地址有误'
            });
        }
    },
    

}