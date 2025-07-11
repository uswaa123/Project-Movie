const fs = require('fs');
const path = require('path');

if (process.argv.length < 3) {
  console.error('Usage: node scripts/create-migration.js <migration-name>');
  process.exit(1);
}

const migrationName = process.argv[2].replace(/\s+/g, '-').toLowerCase();
const timestamp = new Date().toISOString().replace(/[-T:.Z]/g, '').slice(0, 14);
const baseName = `${timestamp}-${migrationName}`;

const migrationsDir = path.join(__dirname, '..', 'migrations');
const sqlsDir = path.join(migrationsDir, 'sqls');

const jsFile = path.join(migrationsDir, `${baseName}.js`);
const upSqlFile = path.join(sqlsDir, `${baseName}-up.sql`);
const downSqlFile = path.join(sqlsDir, `${baseName}-down.sql`);

const jsTemplate = `"use strict";

const fs = require('fs');
const path = require('path');

exports.up = function(db, callback) {
  const sql = fs.readFileSync(path.join(__dirname, 'sqls', '${baseName}-up.sql')).toString();
  db.runSql(sql, callback);
};

exports.down = function(db, callback) {
  const sql = fs.readFileSync(path.join(__dirname, 'sqls', '${baseName}-down.sql')).toString();
  db.runSql(sql, callback);
};

exports._meta = {
  "version": 1
};
`;

if (!fs.existsSync(migrationsDir)) fs.mkdirSync(migrationsDir);
if (!fs.existsSync(sqlsDir)) fs.mkdirSync(sqlsDir);

fs.writeFileSync(jsFile, jsTemplate);
fs.writeFileSync(upSqlFile, '-- Write your UP migration SQL here\n');
fs.writeFileSync(downSqlFile, '-- Write your DOWN migration SQL here\n');

console.log(`Created migration: ${jsFile}`);
console.log(`Created SQL: ${upSqlFile}`);
console.log(`Created SQL: ${downSqlFile}`); 