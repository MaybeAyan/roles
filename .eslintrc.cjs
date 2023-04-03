module.exports = {
	'env': {
		'browser': true,
		'es2021': true,
		'node': true
	},
	'extends': [
		'eslint:recommended',
		'plugin:vue/vue3-essential',
		'plugin:@typescript-eslint/recommended'
	],
	'overrides': [
	],
	'parser': 'vue-eslint-parser',
	'parserOptions': {
		parser: '@typescript-eslint/parser',
		sourceType: 'module',
		ecmaVersion: 2020,
		ecmaFeatures: {
			jsx: true,
		},
	},
	'plugins': [
		'vue',
		'@typescript-eslint'
	],
	'rules': {
		'indent': [
			'error',
			'tab'
		],
		'linebreak-style': [
			'error',
			'windows'
		],
		'quotes': [
			'error',
			'single'
		],
		'semi': [
			'error',
			'never'
		],
		'@typescript-eslint/no-explicit-any': ['off'],
		'vue/comment-directive': 'off',
		'vue/multi-word-component-names':'off',
		'@typescript-eslint/ban-ts-comment': 'off',
	}
}
