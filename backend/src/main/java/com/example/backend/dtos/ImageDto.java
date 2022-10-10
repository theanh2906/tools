package com.example.backend.dtos;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class ImageDto extends BaseDto{
    private String id;
    private String name;
    private String url;
}
