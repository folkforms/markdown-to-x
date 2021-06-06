import utils from AutomatedTestFramework;

/*
Title of Test Case 1

This is the description for browser test case one.

Some more words.
*/

test('This is the description for browser test case one. (file: FIXME-Filename-1-goes-here)', () => {
  utils.navigateTo('https://localhost:3000');
  utils.clickButton('Log in');
  utils.waitForPage('LoginPage');
  utils.typeText('bob', '.username-field');
  utils.typeText('bobspassword', '.password-field');
  utils.clickButton('Log in');
  utils.waitForPage('UserHomePage');
});
