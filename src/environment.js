var helper = require("jsdoc/util/templateHelper");
var fileSupport = require(__dirname + "/fileSupport");
var markdown = require("jsdoc/util/markdown"); 

var envcfg = env.conf.templates || {};

module.exports = function(data, opts, tutorials) {
	return {
		globals : {
			helper : helper,
			fileSupport: fileSupport,
			markdown: markdown,
			analytics: envcfg.analytics,
			copyAssets: envcfg.copyAssets === false ? false : true
		},
		paths : {
			templateDirectores: [
                envcfg.templates,
                opts.template + "/templates/" + envcfg.baseTemplate,
			    opts.template + "/templates/default"
			],
			tutorials : opts.tutorials,
			output : env.opts.destination,
			assets : opts.template + "/assets",
			sourceRootPath : envcfg.sourceRootPath
		},
		raw : {
			readme : opts.readme,
			parsed : data,
			tutorials : tutorials,
			tutorialsHierarchy : fileSupport.readJSON(opts.tutorials + "/tutorials.json")
		},
		strings : {
			copyright : envcfg.copyright,
			footer : envcfg.footer,
			systemName : envcfg.systemName || "Documentation",
			readme : opts.readme,
			mainpagetitle : opts.mainpagetitle || 'Home'
		},
		styling : {
			inverseNav : envcfg.inverseNav,
			theme : envcfg.theme || "simplex",
			syntaxTheme : envcfg.syntaxTheme || "default",
			highlightTutorialCode : envcfg.highlightTutorialCode,
			linenums : envcfg.linenums
		},
		urls : {
			index : helper.getUniqueFilename('index'),
			tutorials : helper.getUniqueFilename('tutorials'),
			modules : helper.getUniqueFilename("modules")
		},
		config : {
			outputSourceFiles : envcfg.outputSourceFiles === true,
			emptyTutorials: envcfg.emptyTutorials || false,
			singleTutorials: envcfg.singleTutorials || false,
			singleModules: envcfg.singleModules || false
		},
		meta : {
			jsdoc_version : env.version.number
		},
		data : {
			pages: env.conf.pages || {}
		},
		custom: env.conf.custom || {}
	};
};
