let args = process.argv;
let folders = {};
let project, previous;
let asmCount = 0;
let fs = require('fs');

var logger = fs.createWriteStream(process.env['APPDATA']+'\\solidworks-wakatime\\log.txt', {
  flags: 'a' // 'a' means appending (old data will be preserved)
})

let pad = (n) => {
  return n.toString().padStart(2, 0)
}

let log = (msg) => {
  let now = new Date();
  let timestamp = `[${now.getFullYear()}-${pad(now.getMonth())}-${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}] `;
  logger.write(timestamp + msg + '\n');
}

log('Sending heartbeat');

for (let doc of args) {
	if (doc.toUpperCase().endsWith('ASM')) {
  	asmCount++;
  	doc = doc.split('\\')
    doc.pop()
  	for (let folder of doc) {
      if (folders[folder] == undefined) folders[folder] = 0
    	folders[folder]++
    }
  }
}

for (let [folder, count] of Object.entries(folders)) {
	if (count < .9*asmCount) {
  	project = previous;
    break;
  }
  previous = folder;
}

if (project == undefined) project = previous;

log('Project: '+project);

let cmd = '"'+process.env['APPDATA']+'\\solidworks-wakatime\\wakatime\\wakatime-cli.exe" --verbose --entity "'+args[2]+'" --project "'+project+'" --language "CAD" --plugin "solidworks-wakatime/0.0.1"'+((args[2] == true)?' --write':'');
log(cmd);
try {
  require('child_process').exec(cmd);
} catch(err) {
  log('failed '+err);
}
log('Complete');
logger.end();