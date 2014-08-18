var fs = require('fs');
var assert = require('assert');
var _ = require('lodash');
var exporter = require('./');

describe('pg-json-schema-export', function () {
  var options = {
    user: process.env.POSTGRES_USER || 'postgres',
    password: process.env.POSTGRES_PASSWORD || 'postgres',
    database: process.env.POSTGRES_DATABASE || 'postgres',
    port: process.env.POSTGRES_PORT || 5432
  };

  describe('#toJSON', function () {
    this.timeout(process.env.TRAVIS ? 60 * 1000 : 20000);

    var db;
    before(function (done) {
      exporter.toJSON(options, 'public')
        .then(function (_db) {
          db = _db;
          done();
        }).catch(done);
    });

    it('should return an object', function () {
      assert(_.isObject(db));
      fs.writeFileSync('build/postbooks_demo_460_data.json', JSON.stringify(db, null, 2));
    });

  });

});
