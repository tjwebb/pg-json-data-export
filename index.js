'use strict';

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
      return knex.select('*').from(table.table_name);
    })
    .then(function (tables) {
      console.log(tables);
      process.exit(0);
    });

};
