package tests;

import base.BaseTest;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;

import static com.microsoft.playwright.assertions.PlaywrightAssertions.assertThat;

public class LoginValidationTest extends BaseTest {


    @BeforeMethod
    public void start() {

        setup();
    }

    @Test
    public void loginValidationTest(){

        page.navigate("http://localhost:4200");

        // Click login without entering values
        page.locator("#login")
                .click();
        page.waitForTimeout(1000);

        // Validate error box visible
        assertThat(
                page.locator(".error-box")
        ).isVisible();
        page.waitForTimeout(1000);

        // Validate messages
        assertThat(
                page.locator(".error-box")
        ).containsText("Email is mandatory");
        page.waitForTimeout(1000);

        assertThat(
                page.locator(".error-box")
        ).containsText("Password is mandatory");
        page.waitForTimeout(1000);

        assertThat(
                page.locator(".error-box")
        ).containsText(
                "Password should be 8 characters long minimum"
        );

        page.locator("#email")
                .fill("ankycode@gmail.com");
        page.waitForTimeout(1000);

        page.locator("#password")
                .fill("password");
        page.waitForTimeout(1000);

        page.locator("#login")
                .click();
        page.waitForTimeout(1000);
    }


    @AfterMethod
    public void close() {

        tearDown();
    }
}
