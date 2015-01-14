'use strict';

var Promise = require('bluebird');
var _ = require('lodash');
var fs = require('fs');

function getTables (knex, schema) {
  return knex
    .select('table_schema', 'table_name')
    .from('information_schema.tables')
    .where('table_schema', schema)
    .orderBy('table_name');
}

exports.toJSON = function (connection, schema) {
  var knex = require('knex')({ client: 'pg', connection: connection });

  return getTables(knex, schema)
    .map(function (table) {
      return knex.select('*').from(table.table_name)
        .then(function (rows) {
          return {
            table: table.table_name,
            rows: _.map(rows, function (row) {
              return _.mapValues(row, function (value, key) {
                if (_.isArray(value)) {
                  return "'" + new Buffer(value).toString('hex') + "'::bytea";
                }

                return value;
              });
            })
          };
        });
    })
    .then(function (tables) {
      return _.indexBy(tables, 'table');
    });
};
