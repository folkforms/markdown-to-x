import utils from AutomatedTestFramework;

/*
Title of Test Case 2

This is the description for browser test case two. Aka "Steve" or 'Benny'.

It should only contain the login code (type username, type password, click submit button, verify
that user home page loads).
*/

test('This is the description for browser test case two. Aka \"Steve\" or \'Benny\'. (file: browser-test-example/inputs/bte-doc2.md)', () => {
  utils.typeText('carl', '.username-field');
  utils.typeText('carlspassword', '.password-field');
  utils.clickButton('Log in');
  utils.waitForPage('UserHomePage');
});
