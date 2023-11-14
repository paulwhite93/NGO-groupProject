package com.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.entity.Donations;
import com.repository.DonationRepository;

@Service
public class DonationService {
	@Autowired
	DonationRepository dr;
	
	public Donations addDonation(Donations donation) {
		dr.save(donation);
		return donation;
	}

	public List<Donations> getAllDonation() {
		// TODO Auto-generated method stub
		return dr.findAll();
	}
}
