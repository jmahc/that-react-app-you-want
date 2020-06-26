module.exports =  {
  '*.md': ['prettier --write', 'git add'],
  'config/**/*.js': [
    'prettier --config ./.prettierrc.js --write "config/**/*.js"',
    'git add',
  ],
  'app/src/**/*.js': [
    'prettier --config ./.prettierrc.js --write "src/**/*.js"',
    'git add',
  ],
}
