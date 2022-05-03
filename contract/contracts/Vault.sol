// SPDX-License-Identifier: MIT



pragma solidity 0.8.4;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/SafeCast.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "./IVault.sol";

contract Vault is ReentrancyGuard, Pausable, Ownable, IVault {
    using SafeERC20 for IERC20;

    mapping(address => mapping(address => uint256)) private doneeBalance;
    mapping(address => uint256) private tokenBalances;
    address[] private donees;
    address[] private whiteListedTokens;
    modifier nonZeroAddress(address _addr) {
        require(_addr != address(0), "Address cannot be zero address");
        _;
    }

    // ***************WARNING: MUTATIVE Functions*************************
    function whitelistToken(address _tokenAddr) external override onlyOwner {
        whiteListedTokens.push(_tokenAddr);
    }

    function donate(
        uint256 _amounts,
        address _tokenAddr,
        address _donee
    )
        external
        override
        nonReentrant
        nonZeroAddress(_tokenAddr)
        nonZeroAddress(_donee)
    {
        require(
            tokenWhitelisted(_tokenAddr),
            "Cannot donate non-permitted tokens!"
        );
        donees.push(_donee);
        tokenBalances[_tokenAddr] = tokenBalances[_tokenAddr] + _amounts;
        doneeBalance[_tokenAddr][_donee] += _amounts;
        IERC20(_tokenAddr).safeTransferFrom(msg.sender, _donee, _amounts);
    }

    function withdraw(address _tokenAddr) external override nonReentrant {
        uint256 amounts = doneeBalance[_tokenAddr][msg.sender];
        tokenBalances[_tokenAddr] = tokenBalances[_tokenAddr] - amounts;
        doneeBalance[_tokenAddr][msg.sender] = 0;
        IERC20(_tokenAddr).safeTransfer(msg.sender, amounts);
    }

    function recoverERC20() external override onlyOwner nonReentrant {}

    // private functions
    function tokenWhitelisted(address _tokenAddr) private view returns (bool) {
        for (uint8 tokensI = 0; tokensI < whiteListedTokens.length; tokensI++) {
            if (whiteListedTokens[tokensI] == _tokenAddr) return true;
        }
        return false;
    }
}
