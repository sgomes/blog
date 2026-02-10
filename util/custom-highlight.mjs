import { createHighlighter } from 'shiki';

const highlightTheme = 'github-dark';
const highlighter = await createHighlighter({
	themes: [highlightTheme],
	langs: ['javascript', 'css', 'html', 'json', 'scss']
});

export const highlight =  {
    async: false,
    walkTokens(token) {
      if (token.type !== 'code') {
        return;
      }

      const lang = getLang(token.lang);

      const code = highlighter.codeToHtml(token.text, {
        lang,
        theme: highlightTheme
      });
      updateToken(token)(code);
    },
    useNewRenderer: true,
    renderer: {
      code(code, infoString, escaped) {
        // istanbul ignore next
        if (typeof code === 'object') {
          escaped = code.escaped;
          infoString = code.lang;
          code = code.text;
        }
        code = code.replace(/\n$/, '');
        return `${escaped ? code : escape(code, true)}\n`;
      },
    },
  };

function getLang(lang) {
  return (lang || '').match(/\S*/)[0];
}

function updateToken(token) {
  return (code) => {
    if (typeof code === 'string' && code !== token.text) {
      token.escaped = true;
      token.text = code;
    }
  };
}

// copied from marked helpers
const escapeTest = /[&<>"']/;
const escapeReplace = new RegExp(escapeTest.source, 'g');
const escapeTestNoEncode = /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/;
const escapeReplaceNoEncode = new RegExp(escapeTestNoEncode.source, 'g');
const escapeReplacements = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
};
const getEscapeReplacement = (ch) => escapeReplacements[ch];
function escape(html, encode) {
  if (encode) {
    if (escapeTest.test(html)) {
      return html.replace(escapeReplace, getEscapeReplacement);
    }
  } else {
    if (escapeTestNoEncode.test(html)) {
      return html.replace(escapeReplaceNoEncode, getEscapeReplacement);
    }
  }

  return html;
}
