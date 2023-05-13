package com.example.backend.models;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.concurrent.atomic.AtomicInteger;

public class Receiver {
    private static final Logger LOGGER = LoggerFactory.getLogger(Receiver.class);

    public void receiveMessage(String message) {
        System.out.println("Received <" + message + ">");
    }

}
