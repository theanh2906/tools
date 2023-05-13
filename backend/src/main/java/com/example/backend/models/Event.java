package com.example.backend.models;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.util.UUID;

@Entity
@Table(name = "EVENTS")
@Data
public class Event {
    @Id
    private UUID id;
    @Column
    private Boolean allDay;
    @Column(name = "START_DATE")
    private String start;
    @Column(name = "END_DATE")
    private String end;
    @Column
    private String title;
}
