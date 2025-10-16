# Grafana Configuration

This directory contains configuration files and dashboards for setting up Grafana with Prometheus as a data source.

## Structure

```
grafana/
├── dashboard.yaml
├── README.md
├── dashboards/
│   ├── Geth Node Dashboard (Feb. 2022)-1738923255606.json
│   ├── Geth node monitor-1738923327169.json
│   └── Node Exporter Full-1738923187280.json
└── datasources/
    └── datasources.yml
```

## Data Source

- **File:** `datasources/datasources.yml`
- **Configured Source:** Prometheus (`http://prometheus:9090`)
- **Default:** Yes

## Dashboard Provider

- **File:** `dashboard.yaml`
- **Provider Type:** File
- **Dashboards Path:** `/var/lib/grafana/dashboards`
- **Update Interval:** 10 seconds

## Dashboards

Place your dashboard JSON files in the `dashboards/` directory. These will be automatically loaded by Grafana using the configuration in `dashboard.yaml`.

## Usage

1. Ensure Prometheus is running and accessible at `http://prometheus:9090`.
2. Mount or copy the `grafana/` directory into your Grafana container or installation.
3. Set the dashboards path in Grafana to `/var/lib/grafana/dashboards` or update `dashboard.yaml` as needed.
4. Start Grafana. The dashboards and data source will be automatically configured.
