pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract NFT1155 is ERC1155, Ownable {
    uint256 constant ARTWORK = 0;

    constructor() ERC1155("") {
        _mint(msg.sender, ARTWORK, 1, "");
    }

    function createToken(
        address account,
        uint256 tokenId,
        uint256 amount
    ) public onlyOwner {
        _mint(account, tokenId, amount, "");
    }

    function burnToken(
        address account,
        uint256 tokenId,
        uint256 amount
    ) public {
        require(msg.sender == account);
        _burn(account, tokenId, amount);
    }
}
