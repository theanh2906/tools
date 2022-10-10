package com.example.backend.rest;

import com.example.backend.dtos.ResponseDto;
import com.example.backend.models.User;
import com.example.backend.repositories.UserRepository;
import com.example.backend.services.BarcodeService;
import org.apache.tomcat.util.http.fileupload.IOUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.imageio.ImageIO;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedInputStream;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.InputStream;
import java.util.Base64;
import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/test")
public class TestController {
    private final Logger LOG = LoggerFactory.getLogger(getClass());
    @Autowired
    private UserRepository repository;
    @Autowired
    private BarcodeService barcodeService;
    @GetMapping("/all")
    public String allAccess() {
        return "Public access";
    }

    @GetMapping("/user")
    @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
    public ResponseEntity<?> userAccess() {
        try {
            return ResponseEntity.ok(new ResponseDto<>(true, "Approved"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ResponseDto<>(false, e.getLocalizedMessage()));
        }
    }

    @GetMapping("/mod")
    @PreAuthorize("hasRole('MODERATOR')")
    public String moderatorAccess() {
        return "Moderator Board.";
    }

    @GetMapping("/admin")
    @PreAuthorize("hasRole('ADMIN')")
    public String adminAccess() {
        return "Admin Board.";
    }

    @GetMapping("/users")
    public List<User> findAll() {
        return repository.findAll();
    }

    @GetMapping("/header")
    public String getHeader(HttpServletRequest request) {
        return request.getHeader("iv-user");
    }
}
