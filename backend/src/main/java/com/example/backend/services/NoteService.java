package com.example.backend.services;

import com.example.backend.models.Note;
import com.example.backend.repositories.NoteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
public class NoteService {
    @Autowired
    private NoteRepository noteRepository;

    public List<Note> findAll() {
        return noteRepository.findAll();
    }

    public Note addNote(Note note) {
        note.setId(UUID.randomUUID().toString());
        return noteRepository.save(note);
    }

    @Transactional
    public Integer deleteNote(String id) {
        return noteRepository.deleteNotes(id);
    }
}
