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

    // Custom Errors
    error AddressIsZero1(address addr);
    error AddressIsZero2(address addr1, address addr2);
    error AmountNotMoreThanZero(uint256 amount);

    // ***************WARNING: MUTATIVE Functions*************************
    function whitelistToken(address _tokenAddr) external override onlyOwner {
        if (_tokenAddr == address(0)) revert AddressIsZero1(_tokenAddr);
        whiteListedTokens.push(_tokenAddr);
    }

    function donate(
        uint256 _amounts,
        address _tokenAddr,
        address _donee
    ) external override nonReentrant {
        if (_amounts <= 0) revert AmountNotMoreThanZero(_amounts);
        if (_tokenAddr == address(0) || _donee == address(0))
            revert AddressIsZero2(_tokenAddr, _donee);
        if (!tokenWhitelisted(_tokenAddr)) revert("Not whitelisted token!");
        
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
        uint256 wlTokenLenCache = whiteListedTokens.length;
        address[] memory wlTokenCache = whiteListedTokens;
        unchecked {
            for (uint8 tokensI = 0; tokensI < wlTokenLenCache; ++tokensI) {
                if (wlTokenCache[tokensI] == _tokenAddr) return true;
            }
        }
        return false;
    }
}
