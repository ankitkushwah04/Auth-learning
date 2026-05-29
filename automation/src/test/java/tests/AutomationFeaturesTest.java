package tests;

import base.BaseTest;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeMethod;

public class AutomationFeaturesTest extends BaseTest {

    @BeforeMethod
    public void start(){

        setup();
    }



    @AfterMethod
    public void close(){

        tearDown();
    }
}
