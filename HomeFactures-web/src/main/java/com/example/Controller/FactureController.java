package com.example.Controller;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.model.Facture;
import com.example.repository.FactureRepository;


@CrossOrigin(origins="http://localhost:4200")
@RestController
@RequestMapping("/api")
public class FactureController {
	
	@Autowired
	private FactureRepository factureRepository;


	@GetMapping("/factures")
	public List<Facture> getAllFactures(){
		return factureRepository.findAll();
	}
	
	@GetMapping("/factures/{id}")
	public ResponseEntity<Facture> getFacture(@PathVariable Long id){
		Optional<Facture> facture = factureRepository.findById(id);
		return ResponseEntity.ok().body(facture.get());
	}
	
	@PostMapping("/factures")
	public ResponseEntity<Facture> createFacture(@Valid @RequestBody Facture facture) throws URISyntaxException {
		if(facture.getId() != null) {
			throw new RuntimeException("Une nouvelle Facture ne peut pas avoir le même ID");
		}
		Facture result = factureRepository.save(facture);
		return ResponseEntity.created(new URI("/api/factures/"+result.getId())).body(result);
	}
	
	@PutMapping("/factures")
	public ResponseEntity<Facture> updateFacture(@Valid @RequestBody Facture facture) throws URISyntaxException {
		if(facture.getId() == null) {
			throw new RuntimeException("ID invalide");
		}
		Facture result = factureRepository.save(facture);
		return  ResponseEntity.ok().body(result);
	}
	
	@DeleteMapping("/factures/{id}")
	public void deleteFacture(@PathVariable Long id) {
		factureRepository.deleteById(id);
	}
}
