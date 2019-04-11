module.exports = {
    name: 'Metrics', service: __, dependencies: ['Prometheus']
};

function __(Prometheus) {
    const Metrics = {
        latencyGauge: new Prometheus.Gauge({
            name:'web_latency_ms',
            help:'The general request latency in ms',
            labelNames: ['path', 'statusCode']
        }),
        throughputCounter: new Prometheus.Counter(
            'web_throughput',
            'The number of requests served'
        )
    };
    return Metrics;
}
