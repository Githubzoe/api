
module.exports = {
    rootDir: '../client',
    roots: ['<rootDir>'],
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'svg'],
    moduleNameMapper: {
      '\\.svg': '<rootDir>/test/utils/svgr.js',
      '^@components/(.*)$': '<rootDir>/components/$1',
      '^@context/(.*)$': '<rootDir>/context/$1',
      '^@layouts/(.*)$': '<rootDir>/layouts/$1',
      '^@pages/(.*)$': '<rootDir>/pages/$1',
      '^@public/(.*)$': '<rootDir>/public/$1',
      '^@styles/(.*)$': '<rootDir>/styles/$1',
      '^@providers/(.*)$': '<rootDir>/providers/$1',
      '^@utils/(.*)$': '<rootDir>/utils/$1',
      '^@api/(.*)$': '<rootDir>/api/$1',
      '\\.(scss|css)$': 'identity-obj-proxy'
    },
    testPathIgnorePatterns: ['/node_modules/', '/.next/'],
    transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.(ts|tsx)$'],
    transform: {
      '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest'
    }
  };