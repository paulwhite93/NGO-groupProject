package com.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.entity.Donors;
import com.repository.DonorRepository;

@Service
public class DonorService {
	@Autowired
	DonorRepository dr;
	
	public Donors addDonor(Donors donor) {
		dr.save(donor);
		return donor;
	}
}
