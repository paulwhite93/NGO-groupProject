package com.entity;

import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

@Entity
@Table(name="donor")
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Donors {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO) 
	private int id;
	@NonNull
	private String firstName;
	private String lastName;
	private String CMA;
	private String phone;
	private String email;
	private String address1;
	private String address2;
	private String city;
	private String zip;
	private String country;
	private String urbanization;
	
}