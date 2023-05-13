package com.example.backend.rest;

import com.example.backend.dtos.EventDto;
import com.example.backend.mappers.EventMapper;
import com.example.backend.models.Event;
import com.example.backend.services.EventService;
import com.example.backend.shared.Constant;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/events")
public class EventController {
    @Autowired
    private EventService eventService;

    @Operation(summary = "Find all events")
    @GetMapping("")
    public List<EventDto> findAll() {
        return eventService.findAll()
                .stream()
                .map(EventMapper::toDto)
                .sorted(Comparator.comparing(EventDto::getStart))
                .collect(Collectors.toList());
    }

    @Operation(summary = "Add new event")
    @PostMapping("/new")
    public ResponseEntity<?> addEvent(@RequestBody Event event) {
        return ResponseEntity.ok(eventService.addEvent(event));
    }

    @GetMapping("/firebase")
    public Flux<EventDto> getFirebaseData() {
        WebClient client = WebClient.builder().baseUrl(Constant.Firebase.EVENTS_API).build();
        Flux<Map> rawResponse = client.get().retrieve().bodyToFlux(Map.class);
        Flux<EventDto> response = rawResponse.flatMap(map -> {
            List<EventDto> listEvents = new ArrayList<>();
            map.keySet().forEach((event -> {
                String id = (String) event;
                 listEvents.add(EventDto.builder()
                         .id(id)
                         .title((String) ((LinkedHashMap<?, ?>) map.get(id)).get("title"))
                         .allDay((Boolean) ((LinkedHashMap<?, ?>) map.get(id)).get("allDay"))
                         .start((String) ((LinkedHashMap<?, ?>) map.get(id)).get("start"))
                         .end((String) ((LinkedHashMap<?, ?>) map.get(id)).get("end"))
                         .build());
            }));
            return Flux.fromIterable(listEvents);
        });
        eventService.deleteAll();
        response.flatMap((each) -> {
            eventService.addEvent(EventMapper.toModel(each));
            return Mono.just(each);
        }).subscribe();
        return response;
    }

    @GetMapping("/sync")
    public ResponseEntity<?> syncCalender() {
        return ResponseEntity.ok(null);
    }
}
