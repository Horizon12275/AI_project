package com.example.gptclient;

import okhttp3.*;
import org.json.JSONArray;
import org.json.JSONObject;

import java.io.IOException;
import java.util.concurrent.TimeUnit;

public class GPTReminder {

    private static final String SET_USER_DETAILS_API_URL = "http://localhost:8000/set_user_details";
    private static final String REMINDERS_API_URL = "http://localhost:8000/generate_reminders";

    public static void main(String[] args) throws IOException {
        UserDetails user = new UserDetails(
                "Office Worker",
                "8-10 hours",
                "Confusing schedule"
        );

        setUserDetails(user);

        EventDetails event = new EventDetails(
                "Introduction to Computer System test",
                "Test",
                "School Building",
                "Tests are about Cache and Optimization. Cheating paper is allowed",
                "2024-07-10"
        );

        String reminders = getReminders(event);
        System.out.println(reminders);
    }

    private static OkHttpClient createClient() {
        return new OkHttpClient.Builder()
                .connectTimeout(60, TimeUnit.SECONDS)
                .writeTimeout(60, TimeUnit.SECONDS)
                .readTimeout(60, TimeUnit.SECONDS)
                .build();
    }

    public static void setUserDetails(UserDetails user) throws IOException {
        OkHttpClient client = createClient();

        JSONObject json = new JSONObject();
        json.put("identity", user.getIdentity());
        json.put("sleep_schedule", user.getSleepSchedule());
        json.put("time_management_challenges", user.getTimeManagementChallenges());

        MediaType mediaType = MediaType.parse("application/json");
        RequestBody body = RequestBody.create(json.toString(), mediaType);
        Request request = new Request.Builder()
                .url(SET_USER_DETAILS_API_URL)
                .post(body)
                .addHeader("Content-Type", "application/json")
                .build();

        executeRequest(client, request, "Set User Details");
    }

    public static String getReminders(EventDetails event) throws IOException {
        OkHttpClient client = createClient();

        JSONObject json = new JSONObject();
        json.put("title", event.getTitle());
        json.put("category", event.getCategory());
        json.put("location", event.getLocation());
        json.put("details", event.getDetails());
        json.put("ddl", event.getDdl());

        MediaType mediaType = MediaType.parse("application/json");
        RequestBody body = RequestBody.create(json.toString(), mediaType);
        Request request = new Request.Builder()
                .url(REMINDERS_API_URL)
                .post(body)
                .addHeader("Content-Type", "application/json")
                .build();

        String responseBody = executeRequest(client, request, "Get Reminders");
        return parseReminders(responseBody);
    }

    private static String executeRequest(OkHttpClient client, Request request, String action) throws IOException {
        try (Response response = client.newCall(request).execute()) {
            if (!response.isSuccessful()) {
                throw new IOException("Failed to " + action + ": " + response);
            }
            return response.body().string();
        }
    }

    private static String parseReminders(String responseBody) {
        try {
            JSONObject jsonResponse = new JSONObject(responseBody);
            JSONArray remindersArray = jsonResponse.getJSONArray("reminders");
            StringBuilder formattedReminders = new StringBuilder("Reminders:\n");
            for (int i = 0; i < remindersArray.length(); i++) {
                formattedReminders.append(remindersArray.getString(i)).append("\n");
            }
            return formattedReminders.toString().trim();
        } catch (Exception e) {
            e.printStackTrace();
            return "Failed to parse response: " + e.getMessage();
        }
    }
}
