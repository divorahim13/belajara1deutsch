const fs = require('fs');
let c = fs.readFileSync('app/dashboard/HorenInteraktiv4.tsx', 'utf8');
c = c.replace(/\\\$/g, '$');
c = c.replace(/\\`/g, '`');
fs.writeFileSync('app/dashboard/HorenInteraktiv4.tsx', c);
