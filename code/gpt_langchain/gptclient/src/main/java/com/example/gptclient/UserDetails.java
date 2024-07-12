package com.example.gptclient;

public class UserDetails {
    private String identity;
    private String sleepSchedule;
    private String timeManagementChallenges;

    public UserDetails(String identity, String sleepSchedule, String timeManagementChallenges) {
        this.identity = identity;
        this.sleepSchedule = sleepSchedule;
        this.timeManagementChallenges = timeManagementChallenges;
    }

    public String getIdentity() {
        return identity;
    }

    public String getSleepSchedule() {
        return sleepSchedule;
    }

    public String getTimeManagementChallenges() {
        return timeManagementChallenges;
    }
}
