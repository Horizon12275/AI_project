
package com.example.gptclient;
public class EventDetails {
    private String title;
    private String category;
    private String location;
    private String details;
    private String ddl;
    private String priorityLevel;

    public EventDetails(String title, String category, String location, String details, String ddl) {
        this.title = title;
        this.category = category;
        this.location = location;
        this.details = details;
        this.ddl = ddl;
    }

    public String getTitle() {
        return title;
    }

    public String getCategory() {
        return category;
    }

    public String getLocation() {
        return location;
    }

    public String getDetails() {
        return details;
    }

    public String getDdl() {
        return ddl;
    }

    public String getPriorityLevel() {
        return priorityLevel;
    }

    public void setPriorityLevel(String priorityLevel) {
        this.priorityLevel = priorityLevel;
    }
}
