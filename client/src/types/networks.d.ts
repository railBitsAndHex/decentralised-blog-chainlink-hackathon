interface INetworkInfo {
    currency: string,
    name: string
};
interface INetwork {
    [chainId : string] : INetworkInfo
}
export interface INetworks {
    [network: string] : INetwork
}

