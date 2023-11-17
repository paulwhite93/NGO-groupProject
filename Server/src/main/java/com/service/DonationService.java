package com.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.entity.Donation_Types;
import com.entity.Donations;
import com.repository.DonationRepository;
import com.repository.DonoTypeRepository;

@Service
public class DonationService {
	@Autowired
	DonationRepository dr;
	@Autowired
	DonoTypeRepository donoTypeRepository;
	
	public Donations addDonation(Donations donation) {
		dr.save(donation);
		return donation;
	}

	public List<Donations> getAllDonation() {
		// TODO Auto-generated method stub
		return dr.findAll();
	}
	
	public List<Donation_Types> getAllDonationType() {
		// TODO Auto-generated method stub
		return donoTypeRepository.findAll();
	}
}