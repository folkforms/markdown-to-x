import utils from AutomatedTestFramework;

/*
Test logging in

Test that when we log in we go to the user home page.

Some more words.
*/

test('Test that when we log in we go to the user home page. (file: browser-test-example/inputs/bte-doc1.md)', () => {
  utils.navigateTo('https://localhost:3000');
  utils.clickButton('Log in');
  utils.waitForPage('LoginPage');
  utils.typeText('bob', '.username-field');
  utils.typeText('bobspassword', '.password-field');
  utils.clickButton('Log in');
  utils.waitForPage('UserHomePage');
});
