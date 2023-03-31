// 你要部署的合约
const hit_dao = artifacts.require("HIT_DAO");

module.exports = function (deployer) {
    // 传入参数
    deployer.deploy(hit_dao, "HIT DAO Workshop", "HITDAO", "https://ipfs.io/ipfs/QmR9tbkWppmVoPCrgEoGCkNvGdxEPWgu3EgUpEDbGCBCNb")
};