package com.example.backend.utils;

import com.example.backend.dtos.UserDto;
import com.example.backend.mappers.UserMapper;
import com.example.backend.services.UserDetailsImpl;
import org.springframework.security.core.context.SecurityContextHolder;

public class SecurityUtils {
    public static UserDto getCurrentUser() {
        return UserMapper.toDto((UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal());
    }
}
