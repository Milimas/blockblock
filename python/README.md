# BlockBlock Python

A Python service for streaming new Ethereum block headers from a Geth node via WebSocket and publishing them to Kafka using Quix Streams.

## Features

- Connects to a Geth node via WebSocket (`eth_subscribe` to `newHeads`)
- Publishes new block header data to a Kafka topic (`new_blocks`)
- Optionally fetches full block data by hash

## Requirements

See [`requirements.txt`](./requirements.txt):

```
requests
quixstreams
web3
eth-tester
websockets
```

## Usage

1. **Install dependencies:**
    ```bash
    pip install -r requirements.txt
    ```

2. **Configure Geth and Kafka addresses in `main.py`:**
    - `GETH_WS_URL` (default: `ws://localhost:8546`)
    - `GETH_BROKER_ADDRESS` (default: `localhost:9092`)

3. **Run the service:**
    ```bash
    python main.py
    ```

## How It Works

- Subscribes to new block headers from Geth.
- Publishes each header to Kafka (`new_blocks` topic).
- Optionally requests full block data by hash.

## Notes

- Ensure Geth is running with WebSocket enabled.
- Kafka broker should be accessible at the configured address.
