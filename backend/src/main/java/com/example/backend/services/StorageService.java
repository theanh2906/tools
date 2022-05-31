package com.example.backend.services;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.PostConstruct;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Objects;

@Service
public class StorageService {
    public static final Logger LOGGER = LoggerFactory.getLogger(StorageService.class);
    private final Path root = Paths.get("uploads");

    @PostConstruct
    public void init() {
        try {
            if (Files.notExists(root)) {
                Files.createDirectory(root);
            }
        } catch (IOException e) {
            LOGGER.error("Could not initialize storage {}", e.getLocalizedMessage());
        }
    }

    public Boolean save(MultipartFile file) {
        try {
            Files.copy(file.getInputStream(), root.resolve(Objects.requireNonNull(file.getOriginalFilename())));
            return true;
        } catch (IOException e) {
            LOGGER.error("Could not save file {}", e.getLocalizedMessage());
            return false;
        }
    }

    public Resource load(String filename) {
        try {
            Path file = root.resolve(filename);
            Resource resource = new UrlResource(file.toUri());

            if (resource.exists() || resource.isReadable()) {
                return resource;
            } else throw new RuntimeException("Could not read file: " + filename);
        } catch (IOException e) {
            LOGGER.error("Could not load file {}", e.getLocalizedMessage());
            throw new RuntimeException("Error: " + e.getLocalizedMessage());
        }
    }
}
