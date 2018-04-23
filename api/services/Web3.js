const Web3 = require('web3');
// let nodeAddress = "http://101.200.32.35:8545";
let nodeAddress = "http://localhost:8545";
// let nodeAddress = "http://172.17.205.164:8545";
let web3 = new Web3(Web3.providers.givenProvider || new Web3.providers.HttpProvider(nodeAddress));
module.exports = web3;