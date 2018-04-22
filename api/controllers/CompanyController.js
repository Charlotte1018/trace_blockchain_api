module.exports = {
    /**
     * 合约的基本信息（管理员地址，注册地址）
     * @param registerBasicInfo
     * @returns {[*]}
     */
    basicContractInfo: (req, res) => {
        let contractInstance = contractInstanceUtils.getMainContractInstance();
        let administrator = contractInstance.administrator.call();
        let registerManagement = contractInstance.registerManagement.call();
        let adminManagement = contractInstance.adminManagement.call();
        res.send({
            code: 0,
            data: {
                'administrator': administrator,
                'registerManagement': registerManagement,
                'adminManagement': adminManagement
            }
        });
    },
    /**
     * POST
     * 企业注册
     * @param enterpriseRegister={
     * bytes32 e_name,bytes32 e_type,bytes32 e_contact,bytes32 e_position,
     * bytes32 e_legalPerson,uint e_contactTel,uint e_socialCode,uint e_legalID,
     * uint e_fax,uint e_organCode,uint e_legalTel,bytes32 e_emai
     * }
     * @returns {[*]}
     */
    enterpriseRegister: (req, res) => {
        let web3 = web3j.web3();
        let contractInstance = contractInstanceUtils.getMainContractInstance();
        let param = req.body;
        let unlock = web3.personal.unlockAccount(param.account, param.password);
        let isAddress = web3.isAddress(param.account);
        //string转换bytes32
        let params = {
            e_name: web3.fromAscii(param.e_name),
            e_type: web3.fromAscii(param.e_type),
            e_contact: web3.fromAscii(param.e_contact),
            e_position: web3.fromAscii(param.e_position),
            e_legalPerson: web3.fromAscii(param.e_legalPerson),
            e_contactTel: param.e_contactTel,
            e_socialCode: param.e_socialCode,
            e_legalID: param.e_legalID,
            e_fax: param.e_fax,
            e_organCode: param.e_organCode,
            e_legalTel: param.e_legalTel,
            e_email: web3.fromAscii(param.e_email)
        };
        if (isAddress) {
            if (unlock) {
                let iseRegister = contractInstance.eRegister(
                    params.e_name,
                    params.e_type,
                    params.e_contact,
                    params.e_position,
                    params.e_legalPerson,
                    params.e_contactTel,
                    params.e_socialCode,
                    params.e_legalID,
                    params.e_fax,
                    params.e_organCode,
                    params.e_legalTel,
                    params.e_email, {
                        from: param.account,
                        gas: 10000000
                    }, (error, result) => {
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
        } else {
            res.send({
                code: 10001,
                info: '账户地址有误'
            });
        };
    },
    /**
     * POST
     * 企业添加库区
     * @param addNewReservoir={
     *bytes32 _name,uint _QHDM,bytes32 _province,bytes32 _city,bytes32 _county,
     *bytes32 _town,uint _postCode 邮政编码
     * }
     * @returns {[*]}
     */
    addNewReservoir: (req, res) => {
        let param = req.body;
        // console.log(param);
        let web3 = web3j.web3();
        let contractInstance = contractInstanceUtils.getMainContractInstance();
        let unlock = web3.personal.unlockAccount(param.account, param.password);
        let isAddress = web3.isAddress(param.account);
        let params = {
            _name: web3.fromAscii(param._name),
            _QHDM: param._QHDM,
            _province: web3.fromAscii(param._province),
            _city: web3.fromAscii(param._city),
            _county: web3.fromAscii(param._county),
            _town: web3.fromAscii(param._town),
            _postCode: param._postCode
        };
        if (isAddress) {
            if (unlock) {
                contractInstance.addNewReservoir(
                    params._name,
                    params._QHDM,
                    params._province,
                    params._city,
                    params._county,
                    params._town,
                    params._postCode,
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
                )
            } else {
                res.send({
                    code: 10002,
                    info: '密码有误，请重新输入'
                });
            }
        } else {
            res.send({
                code: 10001,
                info: '账户地址有误'
            });
        }

    },
    test:(req,res)=>{
        let param = req.body;
        res.send({
            code: 0,
            info: param
        });
    },
    /**
     * POST
     * 企业添加仓库
     * @param addNewStock={
     * uint _reservoirNo,bytes32 _rName,bytes32 _name,bytes32 _type,uint _capacity,uint _validCapacity
     * }
     * @returns {[*]}
     */
    addNewStock: (req, res) => {
        let param = req.body;
        let web3 = web3j.web3();
        let contractInstance = contractInstanceUtils.getMainContractInstance();
        let unlock = web3.personal.unlockAccount(param.account, param.password);
        let isAddress = web3.isAddress(param.account);
        let params = {
            _reservoirNo: param._reservoirNo,
            _rName: web3.fromAscii(param._rName),
            _name: web3.fromAscii(param._name),
            _type: web3.fromAscii(param._type),
            _capacity: param._capacity,
            _validCapacity: param._validCapacity
        };
        if (isAddress) {
            if (unlock) {
                contractInstance.addNewStock(
                    params._reservoirNo,
                    params._rName,
                    params._name,
                    params._type,
                    params._capacity,
                    params._validCapacity,
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
                )
            } else {
                res.send({
                    code: 10002,
                    info: '密码有误，请重新输入'
                });
            }
        } else {
            res.send({
                code: 10001,
                info: '账户地址有误'
            });
        }
    },
    /**
     * POST
     * 企业添加敖间
     * @param addNewAo={
     * uint _reservoirNo,bytes32 _rName,uint _barnNo,bytes32 _stockName,bytes32 _name
     * }
     * @returns {[*]}
     */
    addNewAo: (req, res) => {
        let param = req.body;
        let web3 = web3j.web3();
        let contractInstance = contractInstanceUtils.getMainContractInstance();
        let unlock = web3.personal.unlockAccount(param.account, param.password);
        let isAddress = web3.isAddress(param.account);
        let params = {
            _reservoirNo: param._reservoirNo,
            _rName: web3.fromAscii(param._rName),
            _barnNo: param._barnNo,
            _stockName: web3.fromAscii(param._stockName),
            _name: web3.fromAscii(param._name)
        };
        if (isAddress) {
            if (unlock) {
                contractInstance.addNewAo(
                    params._reservoirNo,
                    params._rName,
                    params._barnNo,
                    params._stockName,
                    params._name,
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
                )
            } else {
                res.send({
                    code: 10002,
                    info: '密码有误，请重新输入'
                });
            }
        } else {
            res.send({
                code: 10001,
                info: '账户地址有误'
            });
        }
    },
    /**
     * POST
     * 企业添加货位
     * @param addNerGoods={
     * uint _gNo,uint _rNo, bytes32 _rName,uint _sBarnNo,bytes32 _sName,uint _aNo,bytes32 _aName,
     * bytes32 _gName,bytes32 _gFlag,bytes32 _gCurrentCapacity
     * }
     * @returns {[*]}
     */
    addNerGoods: (req, res) => {
        let param = req.body;
        let web3 = web3j.web3();
        let contractInstance = contractInstanceUtils.getMainContractInstance();
        let unlock = web3.personal.unlockAccount(param.account, param.password);
        let isAddress = web3.isAddress(param.account);
        let params = {
            _gNo: param._gNo,
            _rNo: param._rNo,
            _rName: web3.fromAscii(param._rName),
            _sBarnNo: param._sBarnNo,
            _sName: web3.fromAscii(param._sName),
            _aNo: param._aNo,
            _aName: web3.fromAscii(param._aName),
            _gName: web3.fromAscii(param._gName),
            _gFlag: web3.fromAscii(param._gFlag),
            _gCurrentCapacity: web3.fromAscii(param._gCurrentCapacity)
        };
        if (isAddress) {
            if (unlock) {
                contractInstance.addNerGoods(
                    params._gNo,
                    params._rNo,
                    params._rName,
                    params._sBarnNo,
                    params._sName,
                    params._aNo,
                    params._aName,
                    params._gName,
                    params._gFlag,
                    params._gCurrentCapacity,
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
                )
            } else {
                res.send({
                    code: 10002,
                    info: '密码有误，请重新输入'
                });
            }
        } else {
            res.send({
                code: 10001,
                info: '账户地址有误'
            });
        }
    },
    /**
     * POST
     * 企业出库登记
     * @param addStockOut={
     * bytes32 _ename,bytes32 _pname,uint _pquantity,uint _pTraceCode
     * }
     * @returns {[*]}
     */
    addStockOut: (req, res) => {
        let param = req.body;
        let web3 = web3j.web3();
        let contractInstance = contractInstanceUtils.getMainContractInstance();
        let unlock = web3.personal.unlockAccount(param.account, param.password);
        let isAddress = web3.isAddress(param.account);
        let params = {
            _ename: web3.fromAscii(param._ename),
            _pname: web3.fromAscii(param._pname),
            _pquantity: param._pquantity,
            _pTraceCode: param._pTraceCode
        };
        if (isAddress) {
            if (unlock) {
                contractInstance.addStockOut(
                    params._ename,
                    params._pname,
                    params._pquantity,
                    params._pTraceCode,
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
                )
            } else {
                res.send({
                    code: 10002,
                    info: '密码有误，请重新输入'
                });
            }
        } else {
            res.send({
                code: 10001,
                info: '账户地址有误'
            });
        }
    },
    /**
     * POST
     * 企业入库登记
     * @param addStockIn={
     * bytes32 _ename,uint _gNo,bytes32 _province,bytes32 _city,bytes32 _county,bytes32 _town,
     * uint _pYear,bytes32 _variety,bytes32 _level,uint _quantity,bytes32 _qReport
     * }
     * @returns {[*]}
     */
    addStockIn: (req, res) => {
        let param = req.body;
        let web3 = web3j.web3();
        let contractInstance = contractInstanceUtils.getMainContractInstance();
        let unlock = web3.personal.unlockAccount(param.account, param.password);
        let isAddress = web3.isAddress(param.account);
        let params = {
            _ename: web3.fromAscii(param._ename),
            _gNo: param._gNo,
            _province: web3.fromAscii(param._province),
            _city: web3.fromAscii(param._city),
            _county: web3.fromAscii(param._county),
            _town: web3.fromAscii(param._town),
            _pYear: param._pYear,
            _variety: web3.fromAscii(param._variety),
            _level: web3.fromAscii(param._level),
            _quantity: param._quantity,
            _qReport: web3.fromAscii(param._qReport)
        };
        if (isAddress) {
            if (unlock) {
                contractInstance.addStockIn(
                    params._ename,
                    params._gNo,
                    params._province,
                    params._city,
                    params._county,
                    params._town,
                    params._pYear,
                    params._variety,
                    params._level,
                    params._quantity,
                    params._qReport,
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
                )
            } else {
                res.send({
                    code: 10002,
                    info: '密码有误，请重新输入'
                });
            }
        } else {
            res.send({
                code: 10001,
                info: '账户地址有误'
            });
        }
    }
}
