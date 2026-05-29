package tests;
import base.BaseTest;
import com.microsoft.playwright.*;
import org.testng.annotations.*;

import java.nio.file.Paths;

import static com.microsoft.playwright.assertions.PlaywrightAssertions.assertThat;


public class LoginTest extends BaseTest {


    @BeforeMethod
    public void start(){

        setup();
    }

    @Test
    public void loginTest(){

        page.navigate("http://localhost:4200/");
        page.waitForTimeout(1000);

        System.out.println(page.title());

        page.locator("text=Register")
                .click();
        page.waitForTimeout(1000);


        page.locator("#firstname")
                .fill("Ankit");
        page.waitForTimeout(1000);

        page.locator("#lastname")
                .fill("Kushwaha");
        page.waitForTimeout(1000);

        page.locator("#email")
                .fill("ankycode@gmail.com");
        page.waitForTimeout(1000);

        page.locator("#password")
                .fill("password");
        page.waitForTimeout(1000);

        page.locator("text=Create account")
                .click();
        page.waitForTimeout(1000);

        BrowserContext context =
                browser.newContext(
                        new Browser.NewContextOptions()
                                .setRecordVideoDir(
                                        Paths.get("videos/")
                                )
                );

        APIRequestContext request =
                playwright.request().newContext();

        APIResponse response =
                request.get(
                        "http://localhost:8080/api/v1/auth/latest-token"
                );

        String otp = response.text();

        System.out.println(otp);

//        page.waitForURL("**localhost:4200/activate-account");

        Locator otpInputs =
                page.locator("input[type='tel']");

        for(int i = 0; i < otp.length(); i++){

            otpInputs.nth(i)
                    .fill(
                            String.valueOf(
                                    otp.charAt(i)
                            )
                    );
        }

        page.waitForTimeout(1000);

        page.locator("text=Go to Login")
                .click();
        page.waitForTimeout(1000);

//        page.waitForURL("**localhost:4200/login");

        page.locator("#email")
                .fill("ankycode@gmail.com");
        page.waitForTimeout(1000);

//        page.evaluate(
//                "() => localStorage.setItem('theme','dark')"
//        );

        page.locator("#password")
                .fill("password");
        page.waitForTimeout(1000);

        page.locator("#login")
                .click();
        page.waitForTimeout(1000);

        // Optional wait after login
        page.waitForTimeout(5000);

        page.locator("text=Log Out")
                .click();

        page.screenshot(
                new Page.ScreenshotOptions()
                        .setPath(Paths.get("login.png"))
                        .setFullPage(true)
        );

        page.waitForTimeout(2000);

    }
    @AfterMethod
    public void close(){

        tearDown();
    }

}