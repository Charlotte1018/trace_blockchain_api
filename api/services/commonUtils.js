module.exports={
    /**
     * 将string转为byte32
     * @param string
     * @returns {[*]} (byte32)
     */
    toBytes32: function(data){
        let web3 = web3j.web3();
        //去除前后空格
        // let datas = data.replace(/(^\s*)|(\s*$)/g, '');
        let bytes32 = web3.fromAscii(data);
        return bytes32;
    },
    /**
     * 将byte32转为string
     * @param byte32
     * @returns {[*]} (string)
     */
    toString: function(data){
        let web3 = web3j.web3();
        let strings = web3.toAscii(data);
        return strings;
    }
}