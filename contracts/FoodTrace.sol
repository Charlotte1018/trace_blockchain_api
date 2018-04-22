pragma solidity ^0.4.11;


contract BlockScan {

    address[] public users;
    mapping(address => Enterprise) public userType;

    mapping(address => string) public nickName;
    uint public userNum;

    TxInfo[] public txs;
    uint public txsNum;

    event TransactionListener(address efrom,string etype,uint etime);

    enum Enterprise{Storage,Transfer,Transport,Quality,Supervision}

    struct TxInfo{
    address userAddr;
    string userName;
    string txType;
    uint txTime;
    }

    function register(string _nickName,uint _status) public {
        users.push(msg.sender);
        nickName[msg.sender] = _nickName;
        userType[msg.sender] = Enterprise(_status);
        txs.push(TxInfo(msg.sender,nickName[msg.sender],"Resgister",now));
        TransactionListener(msg.sender,"Resgister",now);
        userNum++;
        txsNum++;
    }

    function testStockIn() public {
        txs.push(TxInfo(msg.sender,nickName[msg.sender],"StockIn",now));
        TransactionListener(msg.sender,"StockIn",now);
        txsNum++;
    }

    function testStockOut() public {
        txs.push(TxInfo(msg.sender,nickName[msg.sender],"StockOut",now));
        TransactionListener(msg.sender,"StockOut",now);
        txsNum++;
    }

    function testQuality() public {
        txs.push(TxInfo(msg.sender,nickName[msg.sender],"Quality",now));
        TransactionListener(msg.sender,"Quality",now);
        txsNum++;
    }

    function testTransport() public {
        txs.push(TxInfo(msg.sender,nickName[msg.sender],"Transport",now));
        TransactionListener(msg.sender,"Transport",now);
        txsNum++;
    }



}