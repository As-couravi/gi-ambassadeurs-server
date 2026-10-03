const { Low } = require('lowdb');
const { JSONFileSync } = require('lowdb/node');
const path = require('path');
const fs   = require('fs');

const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir);

// Base de données JSON (fichier data/gi.json)
const adapter = new JSONFileSync(path.join(dataDir, 'gi.json'));
const db = new Low(adapter, {
  codes: [
    'ANFI976GI','ANTTUFF976GI','BEN976GI','BOU976GI','DL976GI',
    'JACKY976GI','LAOU976GI','LAZA976GI','MAITA976GI','MIKA976GI',
    'NAI976GI','NASRA976GI','NJ976GI','YOU976GI'
  ],
  candidatures: []
});

// Charger les données existantes ou créer avec les valeurs par défaut
db.read();
if (!db.data.codes)        db.data.codes        = [];
if (!db.data.candidatures) db.data.candidatures = [];
db.write();

console.log('Base de données chargée — ' + db.data.codes.length + ' codes, ' + db.data.candidatures.length + ' candidatures');

module.exports = db;
