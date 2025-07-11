"use strict";

const fs = require('fs');
const path = require('path');

exports.up = function(db, callback) {
  const sql = fs.readFileSync(path.join(__dirname, 'sqls', '20250708-create-users-table-up.sql')).toString();
  db.runSql(sql, callback);
};

exports.down = function(db, callback) {
  const sql = fs.readFileSync(path.join(__dirname, 'sqls', '20250708-create-users-table-down.sql')).toString();
  db.runSql(sql, callback);
};

exports._meta = {
  "version": 1
}; 