package com.example.gptclient;

import okhttp3.*;
import org.json.JSONArray;
import org.json.JSONObject;

import java.io.IOException;
import java.util.concurrent.TimeUnit;

public class GPTSubtask {

    private static final String SET_USER_DETAILS_API_URL = "http://localhost:8000/set_user_details";
    private static final String PRIORITY_API_URL = "http://localhost:8000/generate_priority";
    private static final String SUBTASKS_API_URL = "http://localhost:8000/generate_subtasks";

    public static void main(String[] args) throws IOException {
        UserDetails user = new UserDetails(
                "Student",
                "8-10 hours",
                "Confusing schedule"
        );

        setUserDetails(user);

        EventDetails event = new EventDetails(
                "Introduction to Computer System test",
                "Test",
                "School Building",
                "Tests are about Cache and Optimization. Cheating Paper is allowed.",
                "2024-07-10"
        );

        String priorityLevel = generatePriority(event);
        event.setPriorityLevel(priorityLevel);

        System.out.println("Priority Level: " + priorityLevel);

        String subtasks = getSubtasks(event);
        System.out.println(subtasks);
    }

    private static OkHttpClient getClient() {
        return new OkHttpClient.Builder()
                .connectTimeout(230, TimeUnit.SECONDS)
                .writeTimeout(230, TimeUnit.SECONDS)
                .readTimeout(230, TimeUnit.SECONDS)
                .build();
    }

    private static void setUserDetails(UserDetails user) throws IOException {
        OkHttpClient client = getClient();

        JSONObject json = new JSONObject();
        json.put("identity", user.getIdentity());
        json.put("sleep_schedule", user.getSleepSchedule());
        json.put("time_management_challenges", user.getTimeManagementChallenges());

        RequestBody body = RequestBody.create(json.toString(), MediaType.parse("application/json"));
        Request request = new Request.Builder()
                .url(SET_USER_DETAILS_API_URL)
                .post(body)
                .addHeader("Content-Type", "application/json")
                .build();

        executeRequest(client, request, "Set User Details");
    }

    private static String generatePriority(EventDetails event) throws IOException {
        OkHttpClient client = getClient();

        JSONObject json = new JSONObject();
        json.put("title", event.getTitle());
        json.put("category", event.getCategory());
        json.put("location", event.getLocation());
        json.put("details", event.getDetails());
        json.put("ddl", event.getDdl());

        RequestBody body = RequestBody.create(json.toString(), MediaType.parse("application/json"));
        Request request = new Request.Builder()
                .url(PRIORITY_API_URL)
                .post(body)
                .addHeader("Content-Type", "application/json")
                .build();

        String responseBody = executeRequest(client, request, "Generate Priority");
        JSONObject jsonResponse = new JSONObject(responseBody);
        return jsonResponse.getString("priority_level");
    }

    private static String getSubtasks(EventDetails event) throws IOException {
        OkHttpClient client = getClient();

        JSONObject json = new JSONObject();
        json.put("title", event.getTitle());
        json.put("category", event.getCategory());
        json.put("location", event.getLocation());
        json.put("details", event.getDetails());
        json.put("ddl", event.getDdl());
        json.put("priority_level", event.getPriorityLevel());

        RequestBody body = RequestBody.create(json.toString(), MediaType.parse("application/json"));
        Request request = new Request.Builder()
                .url(SUBTASKS_API_URL)
                .post(body)
                .addHeader("Content-Type", "application/json")
                .build();

        String responseBody = executeRequest(client, request, "Get Subtasks");
        JSONObject jsonResponse = new JSONObject(responseBody);
        JSONArray subtasksArray = jsonResponse.getJSONArray("subtasks");
        StringBuilder formattedSubtasks = new StringBuilder("Subtasks:\n");
        for (int i = 0; i < subtasksArray.length(); i++) {
            formattedSubtasks.append(subtasksArray.getString(i)).append("\n");
        }
        return formattedSubtasks.toString().trim();
    }

    private static String executeRequest(OkHttpClient client, Request request, String action) throws IOException {
        try (Response response = client.newCall(request).execute()) {
            if (!response.isSuccessful()) {
                throw new IOException("Unexpected code " + response);
            }
            String responseBody = response.body().string();
            System.out.println(action + " Response: " + responseBody);
            return responseBody;
        }
    }
}
