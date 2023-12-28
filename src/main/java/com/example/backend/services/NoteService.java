package com.example.backend.services;

import com.example.backend.dtos.NoteDto;
import com.example.backend.models.Note;
import com.example.backend.models.User;
import com.example.backend.repositories.NoteRepository;
import com.example.backend.repositories.UserRepository;
import com.example.backend.shared.Constant;
import com.example.backend.utils.SecurityUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;
import java.util.UUID;

@Service
public class NoteService {
    public Note addNote(Note note) {
        User currentUser = SecurityUtils.getCurrentUser().toModel();
        note.setUser(currentUser);
        note.setId(UUID.randomUUID().toString());
        note.setCreatedDate(new Date().getTime());
        return noteRepository.save(note);
    }

    @Transactional
    public Integer deleteNote(String id) {
        return noteRepository.deleteNotes(id);
    }

    public List<Note> findAll() {
        return noteRepository.findAllByUser(Constant.ADMIN_ID);
    }

    @Transactional
    public Note updateNote(NoteDto note) {
        Note savedNote = noteRepository.findNote(note.getId());
        savedNote.setLastModifiedDate(new Date().getTime());
        savedNote.setContent(note.getContent());
        return noteRepository.save(savedNote);
    }
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private NoteRepository noteRepository;
}
