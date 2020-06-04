package com.example.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.model.Fournisseur;

public interface FournisseurRepository extends JpaRepository<Fournisseur, Long> {

}
