# Prometheus Configuration

This directory contains configuration files for setting up Prometheus monitoring.

## Files

- **prometheus.yml**  
    Main Prometheus configuration file.  
    - Defines global scrape and evaluation intervals.
    - Specifies scrape jobs for Prometheus, cAdvisor, Node Exporter, Docker, Geth, and Prysm.
    - Includes `record.geth.rules.yml` as a rule file.

- **record.geth.rules.yml**  
    Contains Prometheus recording and alerting rules specific to Geth metrics.

## Usage

1. Place both files in the Prometheus configuration directory.
2. Start Prometheus with `prometheus.yml` as the config file.
3. Ensure all target services are running and accessible at the specified endpoints.

## Example Scrape Jobs

```yaml
scrape_configs:
    - job_name: 'prometheus'
        static_configs:
            - targets: ['localhost:9090']
    - job_name: 'geth'
        scrape_interval: "15s"
        static_configs:
            - targets: ["geth:6060"]
        metrics_path: "/debug/metrics/prometheus"
```

## Rule Files

Add custom recording or alerting rules in `record.geth.rules.yml` to extend monitoring capabilities.
