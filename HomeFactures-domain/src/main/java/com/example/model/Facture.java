package com.example.model;

import java.io.Serializable;
import java.sql.Date;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Facture implements Serializable{
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	@Id @GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id; 
	private String numClient;
	private String numFacture;
	private Date dateDebut;
	private Date dateFin;
	private String beneficiaire;
	private Date delai;
	private Boolean isPayed;
	private Double montant;
	private Integer espaceService;
	private String numRecu;
	private String numTransaction;
	private String reference;
	@ManyToOne
	private Fournisseur fournisseur;
	
}
