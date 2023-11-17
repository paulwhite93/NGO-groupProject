package com.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dto.DonorDTO;
import com.entity.Donation_Types;
import com.entity.Donations;
import com.entity.Donors;
import com.repository.DonationRepository;
import com.repository.DonationTypeRepository;
import com.repository.DonorRepository;

@Service
public class DonationService {
	@Autowired
	DonationRepository dr;
	@Autowired
	DonationTypeRepository dtr;
	@Autowired
	DonorRepository donorRepository;
	@Autowired
	DonorDTO donorDto;;
	@Autowired
	EmailService es;
	
	public void addDonation(List<Donations> donation) {
		int storeDonorID=0;
		int count=0;
		String email="";
		String emailTypeName="";
		int total=0;
		for(Donations d:donation) {
			if(count==0) {
				Donors donor=donorDto.donorModelToEntity(d.getDonor());
				email=donor.getEmail();
				donorRepository.save(donor);
				storeDonorID=donor.getId();
				count=1;
			}
			Donors curDonor=new Donors();
			curDonor.setId(storeDonorID);
			d.setDonor(curDonor);
			emailTypeName+=d.getDonation_types().getType_name()+" / ";
			total+=d.getAmount();
			dr.save(d);
		}
		es.sendEmail(email, 
				"Recent Donation Confirmation",
				"Thank you for your recent contribution to "+emailTypeName+ " of the amount: " +total);	
	}

	public List<Donations> getAllDonation() {
		// TODO Auto-generated method stub
		return dr.findAll();
	}
	
	public List<Donation_Types> getAllDonationType(){
		return dtr.findAll();
	}
	
	public Donation_Types addType(Donation_Types type) {
		return dtr.save(type);
	}
}
