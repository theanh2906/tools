package com.example.backend.mappers;

import com.example.backend.dtos.SignupRequest;
import com.example.backend.models.User;
import org.springframework.beans.BeanUtils;

public class UserMapper {
    public static User toModel(SignupRequest dto) {
        final User model = new User();
        BeanUtils.copyProperties(dto, model);
        return model;
    }
}
