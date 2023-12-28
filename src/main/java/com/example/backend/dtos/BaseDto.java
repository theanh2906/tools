package com.example.backend.dtos;

import lombok.Data;

@Data
public abstract class BaseDto {
    private String id;
    private Long createdDate;
    private Long lastModifiedDate;
}
