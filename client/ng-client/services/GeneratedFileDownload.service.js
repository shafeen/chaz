angular.module('basicMEAN')
.service('GeneratedFileDownloadService', ['$location', function ($location) {
    let service = this;

    /**
     * @param {String} filename
     * @param {String[]} csvDataHeaders
     * @param {String[][]} csvDataRows
     */
    service.generateDownloadCsv = function (filename, csvDataHeaders, csvDataRows) {
        let csvNumColumns = csvDataHeaders.length;
        let columnNumsInconsistent = csvDataRows.some(dataRow => {
            return dataRow.length !== csvNumColumns;
        });
        if (columnNumsInconsistent) {
            console.error("The rows for the csv data have an inconsistent number of columns");
        } else {
            let csvText = '';
            let headersPrepped = csvDataHeaders.map(prepCsvText);
            csvText += headersPrepped.join(',') + "\n";
            csvDataRows.forEach(dataRow => {
                let rowsPrepped = dataRow.map(prepCsvText);
                csvText += rowsPrepped.join(',')  + "\n";
            });
            downloadFile(filename, csvText);
        }
    };

    const prepCsvText = function(singleItem) {
        return '"' + singleItem.replace(/"/g, '""') + '"';
    };

    const downloadFile = function(name, contents, mimeType) {
        mimeType = mimeType || "text/plain";
        let blob = new Blob([contents], {type: mimeType});
        let dlink = document.createElement('a');
        dlink.download = name;
        dlink.href = window.URL.createObjectURL(blob);
        dlink.onclick = function(e) {
            // revokeObjectURL needs a delay to work properly
            setTimeout(function() {
                window.URL.revokeObjectURL(this.href);
            }, 1400);
        };
        dlink.click();
        dlink.remove();
    }
}]);
