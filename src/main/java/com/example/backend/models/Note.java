package com.example.backend.models;

import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "NOTES")
@Data
public class Note {
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
    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "CATEGORY_NOTE", joinColumns = @JoinColumn(name = "NOTE_ID"), inverseJoinColumns = @JoinColumn(name = "CATEGORY_ID"))
    private Set<Note> categories = new HashSet<>();
    @ManyToOne(fetch = FetchType.LAZY)
    private User user;
}
