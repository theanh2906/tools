package com.example.backend.models;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.time.LocalDateTime;

@Table
@Entity
@Getter @Setter
public class Images {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY, generator = "UUID")
    @GenericGenerator(name = "UUID", strategy = "org.hibernate.id.UUIDGenerator")
    private String id;
    @Column
    private String name;
    @Column
    private LocalDateTime createdDate;
    @Column
    private Long size;
    @Column
    private String imageType;
    @Column
    private byte[] data;
}
