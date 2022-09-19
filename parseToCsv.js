`use strict`;
const fs = require(`fs`);
const path = `${__dirname}/nginx.log`;
const dateObj = new Date();
const dateNow = `${dateObj.getFullYear()}-${dateObj.getMonth()+1}-${dateObj.getDate()}_${dateObj.getHours()}:${dateObj.getMinutes()}`;
const regex = /(^[\d.]+) - - \[([^\]]+)] "([^"]+?)" (\d+) (\d+) "([^"]+?)" "([^"]+?)" (\d+) ([\d.]+) \[([^\]]+?)] \[([^\]]*?)] ([\d.:]+) (\d+) ([\d.]+) (\d+) ([a-f\d]+)/gm;

let subst = [];
for (let i = 1; i <= 16; i++) { subst.push(`"$${i}"`); }

const data = fs.readFileSync(path, 'utf8');
const result = data.replace(regex, subst.join());

fs.writeFile(
    `${__dirname}/nginx_logs_${dateNow}.csv`, result,
    e => { if (e) console.error(`Write file error: ${e}`); }
);
