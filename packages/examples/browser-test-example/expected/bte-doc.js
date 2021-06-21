import utils from AutomatedTestFramework;

/*
Test logging in

Test that when we log in we go to the user home page.
*/

test('Test that when we log in we go to the user home page. (file: packages/examples/browser-test-example/inputs/bte-doc.md)', () => {
  /* Go to homepage */
  utils.navigateTo('https://localhost:3000');
  /* Click the Log in button */
  utils.clickButton('Log in');
  utils.waitForPage('LoginPage');
  /* Log in as bob/bobspassword */
  utils.typeText('bob', '.username-field');
  utils.typeText('bobspassword', '.password-field');
  utils.clickButton('Log in');
  /* Verify that the user home page loads */
  utils.waitForPage('UserHomePage');
});
