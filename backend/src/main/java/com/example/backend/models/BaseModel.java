package com.example.backend.models;

import lombok.Data;

@Data
public abstract class BaseModel {
    private String createdDate;
    private String lastModifiedDate;
}
