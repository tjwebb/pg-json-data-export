'use strict';
var _ = require('lodash');
var fs = require('fs');

var getTables = async (knex, schema) => {
	return await knex
		.select('table_schema', 'table_name')
		.from('information_schema.tables')
		.where('table_schema', schema)
		.orderBy('table_name');
}

exports.toJSON = async (connection, schema) => {
	var knex = require('knex')({client: 'pg', connection: connection});
	var tables = await getTables(knex, schema);
	return Promise.all(tables.map(table => {
		return knex.select('*').from("page")
		.then(function (rows) {

			var name = table.table_name;
			name = name.substring(0, name.length - 1);

			return _.map(rows, function(row){
				return {
					model: name,
					data: _.mapValues(row, function (value, key) {
						if (_.isArray(value)) {
							return "'" + new Buffer(value).toString('hex') + "'::bytea";
						}
						return value;
					})
				}
			});

		});
	}));
}



