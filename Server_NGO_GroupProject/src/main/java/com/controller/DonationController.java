package com.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.entity.Donations;
import com.entity.Donors;
import com.service.DonationService;
import com.service.DonorService;

@RestController
@RequestMapping("/dono/")
public class DonationController {
	@Autowired
	DonationService donationSerice;
	@Autowired
	DonorService donorService;
	
	@RequestMapping(value="/adddonation",method=RequestMethod.POST)
	public ResponseEntity<String> adddonation(Donations donation) {
		donationSerice.addDonation(donation);
		return new ResponseEntity<>("Donation added", HttpStatus.OK);
	}
	
	@RequestMapping(value="/adddonor",method=RequestMethod.POST)
	public ResponseEntity<String> adddonor(Donors donor) {
		donorService.addDonor(donor);
		return new ResponseEntity<>("Donor added", HttpStatus.OK);
	}
	
}
