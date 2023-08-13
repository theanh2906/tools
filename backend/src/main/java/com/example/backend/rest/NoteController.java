package com.example.backend.rest;

import com.example.backend.dtos.NoteDto;
import com.example.backend.dtos.ResponseDto;
import com.example.backend.mappers.NoteMapper;
import com.example.backend.models.Note;
import com.example.backend.services.NoteService;
import io.swagger.v3.oas.annotations.Operation;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/notes")
public class NoteController {
    private final Logger LOG = LoggerFactory.getLogger(getClass());
    @Autowired
    private NoteService noteService;

    //    @Cacheable(value = "notes")
    @GetMapping("")
    @Operation(summary = "Find all notes")
    public List<NoteDto> findAll() {
        LOG.error("All notes found!!");
        return noteService
                .findAll()
                .stream()
                .map(NoteMapper::toDto)
                .sorted(Comparator.comparing(NoteDto::getCreatedDate))
                .collect(Collectors.toList());
    }

    //    @CacheEvict(value = "notes", allEntries = true)
    @PostMapping("/new")
    @Operation(summary = "Add new note")
    public Note addNote(@RequestBody Note note) {
        return noteService.addNote(note);
    }

    //    @CacheEvict(value = "notes", allEntries = true)
    @DeleteMapping("/{id}")
    @Operation(summary = "Delete note by id")
    public ResponseEntity<?> deleteNote(@PathVariable String id) {
        return noteService.deleteNote(id) == 1 ?
                ResponseEntity.ok(new ResponseDto<>(String.format("Successfully delete note with id %s", id))) :
                ResponseEntity.badRequest().body(new ResponseDto<>(String.format("Failed to delete note with id %s", id)));
    }

//    @PutMapping("")
//    @Operation(summary = "Update note by id")
//    public ResponseEntity<?> updateNote(@RequestBody final NoteDto note) {
//
//    }
}
