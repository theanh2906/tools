package com.example.backend.dtos;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class NoteDto extends BaseDto {
    private String content;
    private String title;
}
