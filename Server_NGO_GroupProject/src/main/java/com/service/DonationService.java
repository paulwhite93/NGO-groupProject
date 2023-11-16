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
	
	@Autowired
	EmailService es;
	
	public Donations addDonation(Donations donation) {
		es.sendEmail(donation.getDonor().getEmail(), 
				"Recent Donation Confirmation To: "+donation.getDonation_types().getType_name(),
				"Thank you for your recent contribution to "+donation.getDonation_types().getType_name()+ " of the amount: " +donation.getAmount());
		dr.save(donation);
		return donation;
	}

	public List<Donations> getAllDonation() {
		// TODO Auto-generated method stub
		return dr.findAll();
	}
}
