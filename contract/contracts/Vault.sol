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
    address[] private whiteListedTokens;

    // ***************WARNING: MUTATIVE Functions*************************
    function whitelistToken(address _tokenAddr) external override onlyOwner {
        require(_tokenAddr != address(0), "Require non-zero");
        whiteListedTokens.push(_tokenAddr);
    }

    function donate(
        uint256 _amounts,
        address _tokenAddr,
        address _donee
    ) external override nonReentrant {
        require(_amounts > 0, "Invalid donate amount");
        require(
            _tokenAddr != address(0) && _donee != address(0),
            "Require non-zero"
        );
        require(
            tokenWhitelisted(_tokenAddr),
            "Cannot donate non-permitted tokens!"
        );
        doneeBalance[_tokenAddr][_donee] += _amounts;
        IERC20(_tokenAddr).safeTransferFrom(
            msg.sender,
            address(this),
            _amounts
        );
    }

    function withdraw(address _tokenAddr) external override nonReentrant {
        uint256 amounts = doneeBalance[_tokenAddr][msg.sender];
        doneeBalance[_tokenAddr][msg.sender] = 0;
        IERC20(_tokenAddr).safeTransfer(msg.sender, amounts);
    }

    function viewWhiteListedTokens() external view returns (address[] memory) {
        return whiteListedTokens;
    }

    function viewBalance(address _donee, address _tokenAddr)
        external
        view
        returns (uint256)
    {
        return doneeBalance[_tokenAddr][_donee];
    }

    // private functions
    function tokenWhitelisted(address _tokenAddr) private view returns (bool) {
        for (uint8 tokensI = 0; tokensI < whiteListedTokens.length; tokensI++) {
            if (whiteListedTokens[tokensI] == _tokenAddr) return true;
        }
        return false;
    }
}
