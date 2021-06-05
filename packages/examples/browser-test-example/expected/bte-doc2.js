import utils from AutomatedTestFramework;

/*
Title of Test Case 2

This is the description for test case two.

It should only contain the login code (type username, type password, click submit button, verify
that user home page loads).
*/

test('This is the description for test case two. (file: FIXME-Filename-goes-here)', () => {
  utils.typeText('carl', '.login-field');
  utils.typeText('carlspassword', '.password-field');
  utils.clickButton('Log in');
  utils.waitForPage('UserHomePage');
});
