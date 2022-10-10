package com.example.backend.services;

import com.google.api.client.googleapis.auth.oauth2.GoogleCredential;
import org.springframework.stereotype.Service;

@Service
public class GoogleService {
    public void verify(String accessToken) {
        GoogleCredential credential = new GoogleCredential().setAccessToken(accessToken);
    }
}
