`use strict`;
const fs = require(`fs`);
const path = `/Users/alexandr/PhpstormProjects/outPosts/nginx.log`;
const regex = /(^[\d.]+) - - \[([^\]]+)] "([^"]+?)" (\d+) (\d+) "([^"]+?)" "([^"]+?)" (\d+) ([\d.]+) \[([^\]]+?)] \[([^\]]*?)] ([\d.:]+) (\d+) ([\d.]+) (\d+) ([a-f\d]+)/gm;

let subst = [];
for (let i = 1; i <= 16; i++) { subst.push(`"$${i}"`); }

const data = fs.readFileSync(path, 'utf8');
const result = data.replace(regex, subst.join());

fs.writeFile(
    `${__dirname}/nginx_log.csv`, result,
    e => { if (e) console.error(`Write file error: ${e}`); }
);
