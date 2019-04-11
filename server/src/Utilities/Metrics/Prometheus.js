module.exports = {
    name: 'Prometheus', service: __, dependencies: ['APPLICATION_NAME', 'require']
};

function __(APPLICATION_NAME, require) {
    const Prometheus = require('prom-client');
    Prometheus.collectDefaultMetrics({ prefix: `${APPLICATION_NAME}_` });
    return Prometheus;
}
