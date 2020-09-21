let args = process.argv;
let folders = {};
let project, previous;
let asmCount = 0;

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

let cmd = 'wakatime-cli.exe --verbose --entity "'+args[2]+'" --project "'+project+'" --language "CAD" --plugin "solidworks-wakatime/0.0.1"'+((args[2] == true)?' --write':'');
require('child_process').exec(cmd);
require('fs').writeFileSync('%appdata%\\solidworks-wakatime\\solidworks-wakatime.swblog.txt', new Date().getTime() + cmd);