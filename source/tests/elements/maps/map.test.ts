import GeoMap from '../../../elements/maps/map.js';
import Element from '../../../elements/svg/element.js';
let data =
{"type":"FeatureCollection","features":[
{"type":"Feature","id":"01","properties":{"name":"Alabama","density":94.65},"geometry":{"type":"Polygon","coordinates":[[[-87.359296,35.00118],[-85.606675,34.984749],[-85.431413,34.124869],[-85.184951,32.859696],[-85.069935,32.580372],[-84.960397,32.421541],[-85.004212,32.322956],[-84.889196,32.262709],[-85.058981,32.13674],[-85.053504,32.01077],[-85.141136,31.840985],[-85.042551,31.539753],[-85.113751,31.27686],[-85.004212,31.003013],[-85.497137,30.997536],[-87.600282,30.997536],[-87.633143,30.86609],[-87.408589,30.674397],[-87.446927,30.510088],[-87.37025,30.427934],[-87.518128,30.280057],[-87.655051,30.247195],[-87.90699,30.411504],[-87.934375,30.657966],[-88.011052,30.685351],[-88.10416,30.499135],[-88.137022,30.318396],[-88.394438,30.367688],[-88.471115,31.895754],[-88.241084,33.796253],[-88.098683,34.891641],[-88.202745,34.995703],[-87.359296,35.00118]]]}},
{"type":"Feature","id":"56","properties":{"name":"Wyoming","density":5.851},"geometry":{"type":"Polygon","coordinates":[[[-109.080842,45.002073],[-105.91517,45.002073],[-104.058488,44.996596],[-104.053011,43.002989],[-104.053011,41.003906],[-105.728954,40.998429],[-107.919731,41.003906],[-109.04798,40.998429],[-111.047063,40.998429],[-111.047063,42.000709],[-111.047063,44.476286],[-111.05254,45.002073],[-109.080842,45.002073]]]}},
{"type":"Feature","id":"72","properties":{"name":"Puerto Rico","density":1082 },"geometry":{"type":"Polygon","coordinates":[[[-66.448338,17.984326],[-66.771478,18.006234],[-66.924832,17.929556],[-66.985078,17.973372],[-67.209633,17.956941],[-67.154863,18.19245],[-67.269879,18.362235],[-67.094617,18.515589],[-66.957694,18.488204],[-66.409999,18.488204],[-65.840398,18.433435],[-65.632274,18.367712],[-65.626797,18.203403],[-65.730859,18.186973],[-65.834921,18.017187],[-66.234737,17.929556],[-66.448338,17.984326]]]}}
]};
let badData = {"type":"FeatureCollection","features":[]};
describe('GeoMap', function () {
  describe('constructor', function () {
    it('should create a map object with 3 features', function() {
      let map = new GeoMap("Alabama",100,100,data);
      chai.expect(map.getFeatureElements().length).to.equal(1);
    });
    it('should create elements with successive identifiers', function() {
      let map1 = new GeoMap("",100,100,data);
      let map2 = new GeoMap("",200,200,data);
      chai.expect(Element.controller.get(map1.id)).to.equal(map1);
      chai.expect(Element.controller.get(map2.id)).to.equal(map2);
    });
  });

  describe('getters/setters', function () {
    it('should get featurename', function() {
      let x = 75;
      let map = new GeoMap("test",100,101,data);
      chai.expect(map.featureName).to.equal("test");
    });
    it('should set, then get new featurename', function() {
        let x = "start";
        let map = new GeoMap(x,100,101,data);
        map.featureName = "end";
        chai.expect(map.featureName).to.equal("end");
    });

    it('should get default styling', function() {
      let map = new GeoMap("Alabama",100,101,data);
      chai.expect(map.getFeatureElements()[0].getAttribute('style')).to.equal('stroke: rgb(51, 51, 51); fill: rgb(255, 255, 255); stroke-width: 0.1px;');
    });

  describe('Stress Test', function () {
        it('should create 3 features', function() {
            let map = new GeoMap("Alabama,Wyoming,Puerto Rico",100,101,data);
            chai.expect(map.getFeatureElements().length).to.equal(3);
        });
        it('should create and then clear 3 features', function() {
        let map = new GeoMap("Alabama,Wyoming,Puerto Rico",100,101,data);
        map.clearPaths();
        chai.expect(map.getFeatureElements().length).to.equal(0);
        });
        it('should create 3 features, clear 3 features, create 2 more', function() {
            let map = new GeoMap("Alabama,Wyoming,Puerto Rico",100,101,data);
            map.clearPaths();
            map.loadExternalJSON("Alabama,Wyoming");
            chai.expect(map.getFeatureElements().length).to.equal(2);
        });
        it('should handle bad data', function() {
            let map = new GeoMap("Alabama,Wyoming,Puerto Rico",100,101,badData);
            chai.expect(map.getFeatureElements().length).to.equal(0);
        });
    });
  });
});
