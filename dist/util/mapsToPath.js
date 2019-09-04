//let rawdata = fs.readFileSync('us-states.json');
//let rawdata = fs.readFileSync('lowresworld.json');
let rawdata = fs.readFileSync('medresworld.json');
let json = JSON.parse(rawdata);
var lines = "";
var k = 0;
var c = 0;
var i = 1;
var minX = 999999;
var minY = 999999;
var maxX = 0;
var maxY = 0;
console.log(`plotting ${json.features.length} countries`);
for (c = 0; c < json.features.length; c++) {
    for (k = 0; k < json.features[c].geometry.coordinates.length; k++) {
        if (json.features[c].geometry.coordinates[k].length == 1) {
            lines += "<path class=\"country\" stroke=\"black\"" + `name=\"${json.features[c].properties.name}\"` + "stroke-width=\"0.1\" fill = \"green\" d=\"" + "M" + json.features[c].geometry.coordinates[k][0][0][0] + " " + json.features[c].geometry.coordinates[k][0][0][1] + " ";
            for (i = 1; i < json.features[c].geometry.coordinates[k][0].length; i++) {
                lines += "L" + json.features[c].geometry.coordinates[k][0][i][0] + " " + json.features[c].geometry.coordinates[k][0][i][1] + " ";
                if (json.features[c].geometry.coordinates[k][0][i][0] < minX) {
                    minX = json.features[c].geometry.coordinates[k][0][i][0];
                }
                if (json.features[c].geometry.coordinates[k][0][i][0] > maxX) {
                    maxX = json.features[c].geometry.coordinates[k][0][i][0];
                }
                if (json.features[c].geometry.coordinates[k][0][i][1] < minY) {
                    minY = json.features[c].geometry.coordinates[k][0][i][1];
                }
                if (json.features[c].geometry.coordinates[k][0][i][1] > maxY) {
                    maxY = json.features[c].geometry.coordinates[k][0][i][1];
                }
            }
            lines += "Z\"/>";
        }
        else {
            lines += "<path class=\"country\" stroke=\"black\"" + `name=\"${json.features[c].properties.name}\"` + "stroke-width=\"0.1\" fill = \"green\" d=\"" + "M" + json.features[c].geometry.coordinates[k][0][0] + " " + json.features[c].geometry.coordinates[k][0][1] + " ";
            for (i = 1; i < json.features[c].geometry.coordinates[k].length; i++) {
                lines += "L" + json.features[c].geometry.coordinates[k][i][0] + " " + json.features[c].geometry.coordinates[k][i][1] + " ";
                if (json.features[c].geometry.coordinates[k][i][0] < minX) {
                    minX = json.features[c].geometry.coordinates[k][i][0];
                }
                if (json.features[c].geometry.coordinates[k][i][0] > maxX) {
                    maxX = json.features[c].geometry.coordinates[k][i][0];
                }
                if (json.features[c].geometry.coordinates[k][i][1] < minY) {
                    minY = json.features[c].geometry.coordinates[k][i][1];
                }
                if (json.features[c].geometry.coordinates[k][i][1] > maxY) {
                    maxY = json.features[c].geometry.coordinates[k][i][1];
                }
            }
            lines += "Z\"/>";
        }
    }
}
console.log(`min:${minX},${minY} max: ${maxX},${maxY}`);
minX -= 10;
minY -= 100;
maxX -= minX - 10;
maxY -= minY - 10;
var h = (maxY - minY) + 100;
var w = (maxX - minX) + 100;
var svgH = `<svg transform=\"scale(1,-1)\" height=\"${h}\" width=\"${w}\" viewbox=\"${minX} ${minY} ${maxX} ${maxY}\">`;
var svgE = "</svg>";
fs.writeFile('map_test.html', svgH + lines + svgE, function (err) {
    if (err)
        throw err;
});
//# sourceMappingURL=mapsToPath.js.map