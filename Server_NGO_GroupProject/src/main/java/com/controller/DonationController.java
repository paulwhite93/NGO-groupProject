package com.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
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
	DonationService donationService;
	@Autowired
	DonorService donorService;
	
	@RequestMapping(value="/addDonation",method=RequestMethod.POST)
	public ResponseEntity<String> adddonation(@RequestBody Donations donation) {
		donationService.addDonation(donation);
		return new ResponseEntity<>("Donation added", HttpStatus.OK);
	}
	
	@RequestMapping(value="/addDonor",method=RequestMethod.POST)
	public ResponseEntity<String> adddonor(@RequestBody Donors donor) {
		donorService.addDonor(donor);
		return new ResponseEntity<>("Donor added", HttpStatus.OK);
	}
	
	@RequestMapping(value="/display",method=RequestMethod.GET)
	public List<?> display(){
		List<Donations> li=donationService.getAllDonation();
		return li;
	}
	
	
}
