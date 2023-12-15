package com.example.backend.models;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "EVENTS")
@Data
public class Event {
    @Id
    private String id;
    @Column
    private Boolean allDay;
    @Column(name = "START_DATE")
    private String start;
    @Column(name = "END_DATE")
    private String end;
    @Column
    private String title;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "USER_ID")
    private User user;
}
