package com.example.backend.models;

import lombok.Data;

import java.io.Serializable;

@Data
public abstract class BaseModel implements Serializable {
    private String createdDate;
    private String lastModifiedDate;
}
