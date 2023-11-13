package com.service;

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
}
