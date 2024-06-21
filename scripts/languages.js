const hljs = require('highlight.js/lib/core');

const javascript = require('highlight.js/lib/languages/javascript')
const java = require('highlight.js/lib/languages/java')
const golang = require('highlight.js/lib/languages/go')
const cpp = require('highlight.js/lib/languages/cpp')
const c = require('highlight.js/lib/languages/c')
const csharp = require('highlight.js/lib/languages/csharp')
const rust = require('highlight.js/lib/languages/rust')
const python = require('highlight.js/lib/languages/python')
const fsharp = require('highlight.js/lib/languages/fsharp')
const json = require('highlight.js/lib/languages/json')
const css = require('highlight.js/lib/languages/css')
const html = require('highlight.js/lib/languages/vbscript-html')
const xml = require('highlight.js/lib/languages/xml')
const sql = require('highlight.js/lib/languages/sql')
const scss = require('highlight.js/lib/languages/scss')

const languages = {
    javascript: {
        language: javascript,
        extensions: ['javascript', 'js', 'jsx']
    },
    java: {
        language: java,
        extensions: ['java', 'jsp']
    },
    golang: {
        language: golang,
        extensions: ['go', 'golang']
    },
    cpp: {
        language: cpp, 
        extensions: ['cpp', 'hpp', 'cc', 'hh', 'c++', 'h++', 'cxx', 'hxx']
    },
    c: {
        language: c,
        extensions: ['c', 'h']
    },
    csharp: {
        language: csharp,
        extensions: ['csharp', 'cs']
    },
    rust: {
        language: rust,
        extensions: ['rust', 'rs']
    },
    python: {
        language: python,
        extensions: ['python', 'py', 'gyp']
    },
    fsharp: {
        language: fsharp,
        extensions: ['fsharp', 'fs', 'fsx', 'fsi', 'fsscript']
    },
    json: {
        language: json,
        extensions: ['json', 'jsonc']
    },
    css: {
        language: css,
        extensions: ['css']
    },
    html: {
        language: html,
        extensions: ['html', 'xhtml']
    },
    xml: {
        language: xml,
        extensions: ['xml', 'rss', 'atom', 'xjb', 'xsd', 'xsl', 'plist', 'svg']
    },
    sql: {
        language: sql,
        extensions: ['sql']
    },
    scss: {
        language: scss,
        extensions: ['scss']
    }
}

function getLanguages() {
    return languages
}

function loadLanguages() {
    for (const [key, language] of Object.entries(languages)) {
        hljs.registerLanguage(key, language.language);
    }
}

module.exports = {
    getLanguages,
    loadLanguages
}