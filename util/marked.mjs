import { Buffer } from 'node:buffer';
import { marked } from 'marked';
import { gulpPlugin } from 'gulp-plugin-extras';

export default function gulpMarked(plugins) {
	if (plugins) {
		plugins.forEach((plugin) => {
			marked.use(plugin);
		});
	}
	return gulpPlugin('gulp-markdown', async (file) => {
		file.contents = Buffer.from(marked(file.contents.toString()));
		file.extname = '.html';
		return file;
	});
}
