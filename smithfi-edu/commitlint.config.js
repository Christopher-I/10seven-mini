module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat', // New feature
        'fix', // Bug fix
        'docs', // Documentation changes
        'style', // Code style changes (formatting, etc)
        'refactor', // Code refactoring
        'test', // Adding tests
        'perf', // Performance improvements
        'build', // Build system changes
        'ci', // CI configuration changes
        'chore', // Other changes (maintenance)
        'revert', // Revert a previous commit
      ],
    ],
  },
};
