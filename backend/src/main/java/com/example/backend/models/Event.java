package com.example.backend.models;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "EVENTS")
@Data
public class Event {
    @Id
    private String id;
    @Column
    private Boolean allDay;
    @Column
    private String start;
    @Column
    private String end;
    @Column
    private String title;
}
