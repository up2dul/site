module.exports = {
  ci: {
    assert: {
      /* Note
        Read more assertions on:
        https://github.com/GoogleChrome/lighthouse-ci/blob/main/docs/configuration.md#assert
      */
      assertions: {
        'categories:performance': ['error', { minScore: 0.9 }],
        'categories:accessibility': ['error', { minScore: 0.9 }],
        'categories:seo': ['warn', { minScore: 0.9 }],
      },
    },
  },
};
