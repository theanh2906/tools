package com.example.backend.dtos;

import lombok.Builder;
import lombok.NoArgsConstructor;

import java.lang.reflect.InvocationTargetException;

public abstract class BuilderDto<T extends BaseDto> {
    Class<T> dto;
    public T getInstance() throws NoSuchMethodException, InvocationTargetException, InstantiationException, IllegalAccessException {
        return dto.getDeclaredConstructor(dto).newInstance();
    }
}
