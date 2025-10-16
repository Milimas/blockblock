# Geth Configuration

This repository contains a sample `geth-config.toml` file for running an Ethereum node using Geth.

## Configuration Overview

- **Network**: Mainnet (`NetworkId = 1`)
- **Sync Mode**: Full
- **Data Directory**: `/root/.ethereum`
- **RPC/WS Ports**: 8545 (HTTP), 8546 (WS)
- **Peer Limits**: Up to 300 peers
- **Bootstrap Nodes**: Predefined for fast discovery
- **Metrics**: InfluxDB integration enabled

## Usage

1. Copy `geth-config.toml` to your Geth directory.
2. Start Geth with:
    ```sh
    geth --config geth-config.toml
    ```
3. Adjust parameters as needed for your environment.

## File Reference

See [`geth-config.toml`](./geth-config.toml) for the full configuration.

## Resources

- [Geth Documentation](https://geth.ethereum.org/docs/)
- [Ethereum Mainnet Bootnodes](https://github.com/ethereum/go-ethereum/wiki/Bootnodes)
