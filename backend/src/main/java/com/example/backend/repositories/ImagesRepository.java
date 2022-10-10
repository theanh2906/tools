package com.example.backend.repositories;

import com.example.backend.models.Images;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ImagesRepository extends JpaRepository<Images, String> {
    @Modifying
    @Query(value = "DELETE FROM images", nativeQuery = true)
    List<String> deleteAllImages();
}
