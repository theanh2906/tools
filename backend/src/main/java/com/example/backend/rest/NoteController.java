package com.example.backend.rest;

import com.example.backend.dtos.NoteDto;
import com.example.backend.dtos.ResponseDto;
import com.example.backend.mappers.NoteMapper;
import com.example.backend.models.Note;
import com.example.backend.services.NoteService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/notes")
public class NoteController {
    @Autowired
    private NoteService noteService;

    @GetMapping("")
    @Operation(summary = "Find all notes")
    public List<NoteDto> findAll() {
        return noteService
                .findAll()
                .stream()
                .map(NoteMapper::toDto)
                .sorted(Comparator.comparing(NoteDto::getCreatedDate))
                .collect(Collectors.toList());
    }

    @PostMapping("")
    @Operation(summary = "Add new note")
    public ResponseEntity<?> addNote(@RequestBody Note note) {
        return ResponseEntity.ok(noteService.addNote(note));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Delete note by id")
    public ResponseEntity<?> deleteNote(@PathVariable String id) {
        return noteService.deleteNote(id) == 1 ?
                ResponseEntity.ok(new ResponseDto<>(String.format("Successfully delete note with id %s", id))) :
                ResponseEntity.badRequest().body(new ResponseDto<>(String.format("Failed to delete note with id %s", id)));
    }
}
