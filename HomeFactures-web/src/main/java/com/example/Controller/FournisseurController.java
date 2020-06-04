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

import com.example.model.Fournisseur;
import com.example.repository.FournisseurRepository;



@CrossOrigin(origins="*")
@RestController
@RequestMapping("/api")
public class FournisseurController {
	
	@Autowired
	private FournisseurRepository fournisseurRepository;
	
	@GetMapping("/fournisseurs")
	public List<Fournisseur> getAllFournisseur(){
		return fournisseurRepository.findAll();
	}
	
	@GetMapping("/fournisseurs/{id}")
	public ResponseEntity<Fournisseur> getFournisseur(@PathVariable Long id) {
		Optional<Fournisseur> fournisseur = fournisseurRepository.findById(id);
		return ResponseEntity.ok().body(fournisseur.get());
	}
	
	@DeleteMapping("/fournisseurs/{id}")
	public void deleteFournisseur(@PathVariable Long id) {
		fournisseurRepository.deleteById(id);
	}
	
	@PostMapping("/fournisseurs")
	public ResponseEntity<Fournisseur> createFournisseur(@Valid @RequestBody Fournisseur fournisseur) throws URISyntaxException {
		if(fournisseur.getId() != null) {
			throw new RuntimeException("Un founisseur ne peux pas avoir le même ID");
		}
		Fournisseur result = fournisseurRepository.save(fournisseur);
		return ResponseEntity.created(new URI("/api/fournisseurs/"+result.getId())).body(result);
	}
	
	@PutMapping("/fournisseurs")
	public ResponseEntity<Fournisseur> updateFournisseur(@Valid @RequestBody Fournisseur fournisseur) throws URISyntaxException {
		if(fournisseur.getId() == null) {
			throw new RuntimeException("Id Invalide");
		}
		Fournisseur result = fournisseurRepository.save(fournisseur);
		return ResponseEntity.ok().body(result);
	}
}
