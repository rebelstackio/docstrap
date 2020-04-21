(() => {
	const fs = require('fs-extra');
	const path = require('path');
	/**
	 * Write config varibles into html's from the template
	 * @param {String} htmlSTR Html file string
	 * @param {*} config JS Object with configurations variables
	 * @returns {String} new Html string
	 */
	function parseConfigToHTML(htmlSTR, config) {
		const varMatch = htmlSTR.match(new RegExp('(?<=\{\{).+?(?=\}\})','g'));
		let resp = htmlSTR;
		varMatch.forEach((_v) => {
			let value = config[_v];
			if(typeof value === 'object') {
				value = value.join('');
			}
			if(value !== undefined)
				resp = resp.replace(new RegExp(`\{\{${_v}\}\}`, 'g'), value)
		});
		return resp;
	}

	/**
	 * Look a file by starting point
	 * @param {String} startPath
	 * @param {RegExp} filter
	 * @param {CallableFunction} callback
	 */
	function fromDir(startPath,filter,callback){
		if (!fs.existsSync(startPath)){
			//console.log("#>" + error('no dir ' + startPath));
			return;
		}
		let files=fs.readdirSync(startPath);
		for(let i=0;i<files.length;i++){
			let filename=path.join(startPath,files[i]);
			let stat = fs.lstatSync(filename);
			if (stat.isDirectory()){
				fromDir(filename,filter,callback); //recurse
			}
			else if (filter.test(filename)) callback(filename);
		}
	}

	function getASCIIBanner() {
		const _banners = [
			'~ D O C S T R A P J S   ♥',
			`######  #######  #####   #####  ####### ######     #    ######
#     # #     # #     # #     #    #    #     #   # #   #     #
#     # #     # #       #          #    #     #  #   #  #     #
#     # #     # #        #####     #    ######  #     # ######
#     # #     # #             #    #    #   #   ####### #
#     # #     # #     # #     #    #    #    #  #     # #
######  #######  #####   #####     #    #     # #     # #      `,
			`================================================================================
=       =====    ======     ====      ===        ==       ======  =====       ==
=  ====  ===  ==  ====  ===  ==  ====  =====  =====  ====  ====    ====  ====  =
=  ====  ==  ====  ==  ========  ====  =====  =====  ====  ===  ==  ===  ====  =
=  ====  ==  ====  ==  =========  ==========  =====  ===   ==  ====  ==  ====  =
=  ====  ==  ====  ==  ===========  ========  =====      ====  ====  ==       ==
=  ====  ==  ====  ==  =============  ======  =====  ====  ==        ==  =======
=  ====  ==  ====  ==  ========  ====  =====  =====  ====  ==  ====  ==  =======
=  ====  ===  ==  ====  ===  ==  ====  =====  =====  ====  ==  ====  ==  =======
=       =====    ======     ====      ======  =====  ====  ==  ====  ==  =======
================================================================================`,
`'########:::'#######:::'######:::'######::'########:'########:::::'###::::'########::
##.... ##:'##.... ##:'##... ##:'##... ##:... ##..:: ##.... ##:::'## ##::: ##.... ##:
##:::: ##: ##:::: ##: ##:::..:: ##:::..::::: ##:::: ##:::: ##::'##:. ##:: ##:::: ##:
##:::: ##: ##:::: ##: ##:::::::. ######::::: ##:::: ########::'##:::. ##: ########::
##:::: ##: ##:::: ##: ##::::::::..... ##:::: ##:::: ##.. ##::: #########: ##.....:::
##:::: ##: ##:::: ##: ##::: ##:'##::: ##:::: ##:::: ##::. ##:: ##.... ##: ##::::::::
########::. #######::. ######::. ######::::: ##:::: ##:::. ##: ##:::: ##: ##::::::::
........::::.......::::......::::......::::::..:::::..:::::..::..:::::..::..:::::::::`,
`▓█████▄  ▒█████   ▄████▄    ██████ ▄▄▄█████▓ ██▀███   ▄▄▄       ██▓███
▒██▀ ██▌▒██▒  ██▒▒██▀ ▀█  ▒██    ▒ ▓  ██▒ ▓▒▓██ ▒ ██▒▒████▄    ▓██░  ██▒
░██   █▌▒██░  ██▒▒▓█    ▄ ░ ▓██▄   ▒ ▓██░ ▒░▓██ ░▄█ ▒▒██  ▀█▄  ▓██░ ██▓▒
░▓█▄   ▌▒██   ██░▒▓▓▄ ▄██▒  ▒   ██▒░ ▓██▓ ░ ▒██▀▀█▄  ░██▄▄▄▄██ ▒██▄█▓▒ ▒
░▒████▓ ░ ████▓▒░▒ ▓███▀ ░▒██████▒▒  ▒██▒ ░ ░██▓ ▒██▒ ▓█   ▓██▒▒██▒ ░  ░
 ▒▒▓  ▒ ░ ▒░▒░▒░ ░ ░▒ ▒  ░▒ ▒▓▒ ▒ ░  ▒ ░░   ░ ▒▓ ░▒▓░ ▒▒   ▓▒█░▒▓▒░ ░  ░
 ░ ▒  ▒   ░ ▒ ▒░   ░  ▒   ░ ░▒  ░ ░    ░      ░▒ ░ ▒░  ▒   ▒▒ ░░▒ ░
 ░ ░  ░ ░ ░ ░ ▒  ░        ░  ░  ░    ░        ░░   ░   ░   ▒   ░░
   ░        ░ ░  ░ ░            ░              ░           ░  ░
 ░               ░
`,
` ▄▀▀█▄▄   ▄▀▀▀▀▄   ▄▀▄▄▄▄   ▄▀▀▀▀▄  ▄▀▀▀█▀▀▄  ▄▀▀▄▀▀▀▄  ▄▀▀█▄   ▄▀▀▄▀▀▀▄
█ ▄▀   █ █      █ █ █    ▌ █ █   ▐ █    █  ▐ █   █   █ ▐ ▄▀ ▀▄ █   █   █
▐ █    █ █      █ ▐ █         ▀▄   ▐   █     ▐  █▀▀█▀    █▄▄▄█ ▐  █▀▀▀▀
  █    █ ▀▄    ▄▀   █      ▀▄   █     █       ▄▀    █   ▄▀   █    █
 ▄▀▄▄▄▄▀   ▀▀▀▀    ▄▀▄▄▄▄▀  █▀▀▀    ▄▀       █     █   █   ▄▀   ▄▀
█     ▐           █     ▐   ▐      █         ▐     ▐   ▐   ▐   █
▐                 ▐                ▐                           ▐   `
		];
		const resp = _banners[_getRandomPos()];
		return process.platform === 'win32' ? _banners[0] : resp;
	}

	function _getRandomPos() {
		return Math.floor(Math.random() * (5 - 0) + 0);
	}

	module.exports = { parseConfigToHTML, fromDir, getASCIIBanner }
})();
