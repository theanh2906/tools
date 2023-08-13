package com.example.backend.models;

import lombok.Data;

import java.io.Serializable;

@Data
public abstract class BaseModel implements Serializable {
    private Long createdDate;
    private Long lastModifiedDate;
}
