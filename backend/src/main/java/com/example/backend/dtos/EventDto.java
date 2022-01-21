package com.example.backend.dtos;

import lombok.Data;

@Data
public class EventDto {
    private Boolean allDay;
    private String start;
    private String end;
    private String title;
}
