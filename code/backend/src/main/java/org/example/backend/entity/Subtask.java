package org.example.backend.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "subtasks")
@JsonIgnoreProperties({"hibernateLazyInitializer","handler","event"})//忽略event属性
public class Subtask {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
    private String content;
    private boolean isDone;
    private LocalDate ddl;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "eid")
    private Event event;
}
