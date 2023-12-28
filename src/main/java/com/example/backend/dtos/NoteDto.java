package com.example.backend.dtos;

import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
public class NoteDto extends BaseDto implements Serializable {
    private String content;
    private String title;
}
