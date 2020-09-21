# solidworks-wakatime
Wakatime tracking for solidworks

it's kinda jank right now ngl

basically this is a solidworks macro with a couple event listens for active doc changed, mouse movement/clicks, opening file, and eventually saved file too
then it collects the magic and sends it to a JS script
which guesses at what the project name is and sends it to the wakatime script
drop this project into `%appdata%\solidworks-wakatime` or change the paths yourself
download [wakatime-cli](https://github.com/wakatime/wakatime/releases) to this folder
I recommend setting up wakatime with another editor like VS Code first because this plugin doesn't have any ability to setup wakatime or even sense if it's there or not
Still trying to figure out how to get the macro to load automatically