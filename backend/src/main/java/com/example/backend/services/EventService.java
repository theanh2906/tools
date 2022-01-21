package com.example.backend.services;

import com.example.backend.models.Event;
import com.example.backend.repositories.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class EventService {
    @Autowired
    private EventRepository eventRepository;

    public List<Event> findAll() {
        return eventRepository.findAll();
    }

    public Event addEvent(Event event) {
        event.setId(UUID.randomUUID().toString());
        return eventRepository.save(event);
    }
}
