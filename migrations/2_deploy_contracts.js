var RealState = artifacts.require("./RealState.sol");

module.exports = function(deployer) {
  deployer.deploy(RealState, '0x994B0718535d0e4051EFf89b5f459A0AEFA274AF');
};
