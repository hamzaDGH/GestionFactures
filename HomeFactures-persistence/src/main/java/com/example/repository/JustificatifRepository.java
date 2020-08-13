package com.example.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.model.Justificatif;

public interface JustificatifRepository extends JpaRepository<Justificatif, Long> {
	Optional<Justificatif> findByName(String name);
}
