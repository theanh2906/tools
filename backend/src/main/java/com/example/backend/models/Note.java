package com.example.backend.models;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "NOTES")
@Data
public class Note extends BaseModel {
    @Id
    private String id;
    @Column
    private String content;
    @Column
    private String title;
    @Column
    private Long createdDate;
    @Column
    private Long lastModifiedDate;
}
