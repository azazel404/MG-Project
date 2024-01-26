module.exports = {
	extends: ['mantine', 'next', 'next/core-web-vitals', 'prettier', 'eslint:recommended'],
	//   plugins: ['testing-library', 'jest'],
	// overrides: [
	// 	{
	// 		files: ['**/?(*.)+(spec|test).[jt]s?(x)'],
	// 		extends: ['plugin:testing-library/react'],
	// 	},
	// ],
	// parserOptions: {
	// 	project: './tsconfig.json',
	// },
	rules: {
		'react/react-in-jsx-scope': 'off',
		'import/extensions': 'off',
		'react/no-unescaped-entities': 'off',
		'@next/next/no-page-custom-font': 'off',
	},
}
