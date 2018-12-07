pragma solidity ^0.4.24;

contract RealState {
    struct immobile {
        address _owner;
        string _name;
        string _address;
        string _zipcode;
        string _state;
    }

    mapping(uint => immobile) public immobiles;
    uint public immobile_count;
    address public owner;

    constructor(address _owner) public {
        owner = _owner;
    }

    function add(string _name, string _address, string _zipcode, string _state) public payable returns (uint _id){
        require(msg.value == 1 ether, "Você precisa pagar 1 ether para registrar o contrato.");      
        immobiles[immobile_count] = immobile(msg.sender, _name, _address, _zipcode, _state);   
        immobile_count += 1;       

        emit addImmobile(immobile_count);
        return immobile_count;
    }

    function get(uint _i) public view returns (address _owner, string _name, string _address, string _zipcode, string _state) {
        return (immobiles[_i]._owner, immobiles[_i]._name, immobiles[_i]._address, immobiles[_i]._zipcode, immobiles[_i]._state);
    }

    function withdraw() public payable {
        require(owner == msg.sender, "Somente o dono do contrato pode sacar.");
        msg.sender.transfer(address(this).balance);
    }

    event addImmobile(uint indexed immobile_count);
}