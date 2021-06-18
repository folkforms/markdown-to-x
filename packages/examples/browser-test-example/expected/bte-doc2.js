import utils from AutomatedTestFramework;

/*
Title of Test Case 2 (Kitchen sink test)

This is the description for browser test case two. Aka "Steve" or 'Benny'.

This is a 'kitchen sink' test and makes no sense. It is just here to test things. Don't try to understand it.

It should only contain the login code (type username, type password, click submit button, verify
that user home page loads).
*/

test('This is the description for browser test case two. Aka "Steve" or \'Benny\'. (file: browser-test-example/inputs/bte-doc2.md)', () => {
  /* Log in as carl/carlspassword */
  utils.typeText('carl', '.username-field');
  utils.typeText('carlspassword', '.password-field');
  utils.clickButton('Log in');
  /* Verify that the user home page loads */
  utils.waitForPage('UserHomePage');
});
