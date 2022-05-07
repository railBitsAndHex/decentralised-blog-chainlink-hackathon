// SPDX-License-Identifier: MIT





pragma solidity 0.8.4;

interface IVault {
    function donate(
        uint256 _amounts,
        address _tokenAddr,
        address _donee
    ) external;

    function whitelistToken(address _tokenAddr) external;

    function withdraw(address _tokenAddr) external;

    // function recoverERC20() external;
}
