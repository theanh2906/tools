package com.example.backend.repositories;

import com.example.backend.models.Note;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface NoteRepository extends JpaRepository<Note, String> {
    @Modifying
    @Query("delete from Note n where n.id = :id")
    Integer deleteNotes(@Param("id") String id);
}
