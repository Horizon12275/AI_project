
package org.example.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class EventDetails {
    private String title;
    private String category;
    private String location;
    private String details;
    private String ddl;
    private String priority;
}
