package com.example.backend.rest;

import com.example.backend.dtos.ImageDto;
import com.example.backend.services.StorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletResponse;
import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/api/storage")
public class StorageController {
    @Autowired
    private StorageService storageService;

    @PostMapping("/upload")
    public ResponseEntity<String> uploadFile(@RequestParam("file") MultipartFile[] file) {
        try {
            Arrays.stream(file).forEach(storageService::save);
            return new ResponseEntity<>("Successfully upload ", HttpStatus.ACCEPTED);
        } catch (Exception e) {
            return new ResponseEntity<>(String.format("Failed to upload. Error: %s", e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/upload-images")
    public ResponseEntity<?> uploadImage(@RequestParam("file") List<MultipartFile> file) {
        try {
            ;
            return ResponseEntity.ok().body(storageService.uploadImages(file));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(String.format("Failed to upload. Error: %s", e.getMessage()));
        }
    }

    @GetMapping("/download-image")
    public ResponseEntity<?> downloadImages(@RequestParam int index, final HttpServletResponse response) {
        try {
            storageService.downloadImage(index, response);
            return new ResponseEntity<>("Downloading...", HttpStatus.ACCEPTED);
        } catch (Exception e) {
            return new ResponseEntity<>(String.format("Failed to download. Error: %s", e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/image-base64")
    public ResponseEntity<?> getImageBase64(@RequestParam int index) {
        try {
            return new ResponseEntity<>(storageService.getImageBase64(index), HttpStatus.ACCEPTED);
        } catch (Exception e) {
            return new ResponseEntity<>(String.format("Failed to download. Error: %s", e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/images")
    public ResponseEntity<?> getImages() {
        try {
            List<ImageDto> result = storageService.getAllImages();
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @DeleteMapping("/images/{id}")
    public ResponseEntity<?> deleteImage(@PathVariable String id) {
        try {
            storageService.deleteImage(id);
            return ResponseEntity.ok("Deleted");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @DeleteMapping("/images")
    public ResponseEntity<?> deleteAllImages() {
        try {
            return ResponseEntity.ok().body(storageService.deleteAllImages());
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }
}
