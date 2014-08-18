pg-json-data-export
=====================

[![NPM version][npm-image]][npm-url]
[![Build status][travis-image]][travis-url]
[![Dependency Status][daviddm-image]][daviddm-url]

Export a Postgres database as JSON

## Install
```sh
$ npm install pg-json-data-export --save
```

## Usage

```js
var exporter = require('pg-json-data-export');
var connection = {
  // pg connections object
};
exporter.toJSON(connection, 'public')
  .then(function (dump) {
    console.log(dump.table1.rows);
  });
```

## API

#### `.toJSON (connection, schema)`
| @param | description
|:---|:---|
`connection` | connection string or object compatible with [`pg`](https://github.com/brianc/node-postgres)
`schema` | the database schema to export
| **@return** | **description**
`dump` | dump of all tables in database schema<br/>`{ table1: { rows: [ { /* ... */ } ] } }`

## License
MIT

[npm-image]: https://img.shields.io/npm/v/pg-json-data-export.svg?style=flat
[npm-url]: https://npmjs.org/package/pg-json-data-export
[travis-image]: https://img.shields.io/travis/tjwebb/pg-json-data-export.svg?style=flat
[travis-url]: https://travis-ci.org/tjwebb/pg-json-data-export
[daviddm-image]: http://img.shields.io/david/tjwebb/pg-json-data-export.svg?style=flat
[daviddm-url]: https://david-dm.org/tjwebb/pg-json-data-export
