package org.example.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "events")
@JsonIgnoreProperties({"hibernateLazyInitializer","handler","user"})//忽略user属性
public class Event {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
    private String title;
    private String details;
    private Integer category;
    private String location;
    private Integer priority;
    private LocalTime startTime;
    private LocalTime endTime;
    private LocalDate ddl;
    private int uid;//分库 因此无法使用外键
    @OneToMany(mappedBy = "event", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<Subtask> subtasks;
    @OneToMany(mappedBy = "event", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<Reminder> reminders;

    public enum categoryT{
        Work_and_Study,Leisure_and_Recreation,Sports,Family_and_Socializing,Personal_Development,Daily_Living,Other
    }
}
