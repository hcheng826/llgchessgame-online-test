var express = require('express');
var util = require('../config/util.js');
var router = express.Router();
var ethers = require('ethers');

router.get('/', function (req, res) {
    res.render('partials/play', {
        title: 'Chess Hub - Game',
        user: req.user,
        isPlayPage: true
    });
});

router.post('/', async function (req, res) {
    // var side = req.body.side;
    // var opponent = req.body.opponent; // playing against the machine in not implemented
    // var token = util.randomString(20);
    // res.redirect('/game/' + token + '/' + side);
    const singer = new ethers.Wallet(process.env.PRIVATE_KEY, ethers.getDefaultProvider('http://127.0.0.1:8545/'));
    // const singer = new ethers.Wallet('0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80', ethers.getDefaultProvider('http://127.0.0.1:8545/'));
    const contract = new ethers.Contract("0x4691F60c894d3f16047824004420542E4674E621", ["function approve(address,uint256) returns (bool)"], singer);
    const tx = await contract.approve("0x70997970C51812dc3A010C7d01b50e0d17dc79C8", 100)
    const receipt = await tx.wait()
    res.status(200).send(receipt.hash);
});

module.exports = router;
