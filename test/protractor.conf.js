exports.config = {
  // The address of a running selenium server.
  //seleniumAddress: 'http://localhost:4444/wd/hub',

  // Capabilities to be passed to the webdriver instance.
  capabilities: {
    'browserName': 'chrome'
  },

  // baseUrl: 'http://localhost:3000',

  // Spec patterns are relative to the current working directly when
  // Active tests has a '-' dash in this format: 01-homepage.js
  // Inactive test can be left in diretory but remove the '##-' number prefix
  specs: [
    'e2e/*-*.js'
  ]
};
