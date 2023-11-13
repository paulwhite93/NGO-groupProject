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

@Entity
@Table(name="donor")
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Donors {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO) 
	private int id;
	@Column
	private String firstName;
	@Column
	private String lastName;
	@Column
	private String CMA;
	@Column
	private String phone;
	@Column
	private String email;
	@Column
	private String address1;
	@Column
	private String address2;
	@Column
	private String city;
	@Column
	private String zip;
	@Column
	private String country;
	@Column
	private String urbanization;
}