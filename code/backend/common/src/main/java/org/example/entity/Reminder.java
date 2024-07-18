package org.example.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "reminders")
@JsonIgnoreProperties({"hibernateLazyInitializer","handler","event"})//忽略event属性
public class Reminder {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
    private String content;
    private boolean isDone;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "eid")
    private Event event;
}
