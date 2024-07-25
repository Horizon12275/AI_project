package org.example.entity;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

class ResultTest {

    private Result<String> successResult;
    private Result<String> errorResult;

    @BeforeEach
    void setUp() {
        successResult = Result.success("data");
        errorResult = Result.error(400, "Error occurred");
    }

    @AfterEach
    void tearDown() {
        successResult = null;
        errorResult = null;
    }

    @Test
    void success() {
        assertNotNull(successResult);
        assertEquals(200, successResult.getCode());
        assertEquals("data", successResult.getData());
        assertEquals("请求成功!", successResult.getMessage());
    }

    @Test
    void error() {
        assertNotNull(errorResult);
        assertEquals(400, errorResult.getCode());
        assertNull(errorResult.getData());
        assertEquals("Error occurred", errorResult.getMessage());
    }

    @Test
    void asJsonString() {
        String jsonString = successResult.asJsonString();
        assertNotNull(jsonString);
        assertTrue(jsonString.contains("\"code\":200"));
        assertTrue(jsonString.contains("\"data\":\"data\""));
        assertTrue(jsonString.contains("\"message\":\"请求成功!\""));

        String errorJsonString = errorResult.asJsonString();
        assertNotNull(errorJsonString);
        assertTrue(errorJsonString.contains("\"code\":400"));
        assertTrue(errorJsonString.contains("\"data\":null"));
        assertTrue(errorJsonString.contains("\"message\":\"Error occurred\""));
    }

    @Test
    void getCode() {
        assertEquals(200, successResult.getCode());
        assertEquals(400, errorResult.getCode());
    }

    @Test
    void getData() {
        assertEquals("data", successResult.getData());
        assertNull(errorResult.getData());
    }

    @Test
    void getMessage() {
        assertEquals("请求成功!", successResult.getMessage());
        assertEquals("Error occurred", errorResult.getMessage());
    }

    @Test
    void setCode() {
        successResult.setCode(404);
        assertEquals(404, successResult.getCode());
    }

    @Test
    void setData() {
        successResult.setData("new data");
        assertEquals("new data", successResult.getData());
    }

    @Test
    void setMessage() {
        successResult.setMessage("new message");
        assertEquals("new message", successResult.getMessage());
    }

    @Test
    void testEquals() {
        Result<String> result1 = Result.success("data");
        Result<String> result2 = Result.success("data");
        assertEquals(result1, result2);

        Result<String> result3 = Result.error(400, "Error occurred");
        Result<String> result4 = Result.error(400, "Error occurred");
        assertEquals(result3, result4);

        Result<String> result5 = Result.success(null);
        Result<String> result6 = Result.success(null);
        assertEquals(result5, result6);
    }

    @Test
    void canEqual() {
        Result<String> result1 = Result.success("data");
        Result<String> result2 = Result.success("data");
        assertTrue(result1.canEqual(result2));

        Result<String> result3 = Result.error(400, "Error occurred");
        assertTrue(result3.canEqual(result3));
    }

    @Test
    void testHashCode() {
        Result<String> result1 = Result.success("data");
        Result<String> result2 = Result.success("data");
        assertEquals(result1.hashCode(), result2.hashCode());

        Result<String> result3 = Result.error(400, "Error occurred");
        Result<String> result4 = Result.error(400, "Error occurred");
        assertEquals(result3.hashCode(), result4.hashCode());
    }

    @Test
    void testToString() {
        Result<String> result = Result.success("data");
        String expected = "Result(code=200, data=data, message=请求成功!)";
        assertEquals(expected, result.toString());

        Result<String> errorResult = Result.error(400, "Error occurred");
        String expectedErrorString = "Result(code=400, data=null, message=Error occurred)";
        assertEquals(expectedErrorString, errorResult.toString());
    }

    @Test
    void testNoArgsConstructor() {
        Result<String> result = new Result<>();
        assertNotNull(result);
    }

    @Test
    void testGenericData() {
        Result<Integer> result = Result.success(123);
        assertEquals(123, result.getData());

        Result<List<String>> resultList = Result.success(List.of("item1", "item2"));
        assertEquals(List.of("item1", "item2"), resultList.getData());
    }

    @Test
    void testErrorBoundaryConditions() {
        Result<String> errorResult = Result.error(500, "Internal Server Error");
        assertEquals(500, errorResult.getCode());
        assertNull(errorResult.getData());
        assertEquals("Internal Server Error", errorResult.getMessage());
    }
}
