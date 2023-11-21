package com.controller;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.entity.Donation_Types;
import com.entity.Donations;
import com.entity.Donors;
import com.service.DonationService;
import com.service.DonorService;
@CrossOrigin
@RestController
@RequestMapping("/dono/")
public class DonationController {
	@Autowired
	DonationService donationService;
	@Autowired
	DonorService donorService;
	public static String UPLOAD_DIRECTORY = System.getProperty("user.dir") + "/uploads";
	@RequestMapping(value="/addDonation",method=RequestMethod.POST)
	public ResponseEntity<String> adddonation(@RequestBody Donations donation) {
		System.out.println(donation);
		donationService.addDonation(donation);
		return new ResponseEntity<>("Donation and donor added", HttpStatus.OK);
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
	
	@RequestMapping(value="/addDonationType",method=RequestMethod.POST)
	public ResponseEntity<String> addType(@RequestPart("data") Donation_Types type,@RequestParam("image") MultipartFile file) throws IOException{
		try {
	        String directoryPath = UPLOAD_DIRECTORY+"/donationTypeImag";
	        // Create directories if they do not exist
	        Files.createDirectories(Paths.get(directoryPath));
	        String filename = file.getOriginalFilename();
	        // unique filename
	        String uniqueFilename = System.currentTimeMillis() + "_" + filename;
	        String path = directoryPath + "/" + uniqueFilename;
	        // check image file
	        String contentType = file.getContentType();
	        if (contentType != null && contentType.startsWith("image")) {
	            // Save the file
	            Files.write(Paths.get(path), file.getBytes());
	            type.setImage_url(path);
	            donationService.addType(type);

	            return new ResponseEntity<>("Donor Type added", HttpStatus.OK);
	        } else {
	            return new ResponseEntity<>("Invalid file type", HttpStatus.BAD_REQUEST);
	        }
	    } catch (Exception e) {
	        return new ResponseEntity<>("Error adding donation type", HttpStatus.INTERNAL_SERVER_ERROR);
	    }
	}
	
	@RequestMapping(value="/displayDonationType",method=RequestMethod.GET)
	public List<Donation_Types> displayType(){
		List<Donation_Types> li=donationService.getAllDonationType();
		return li;
	}
}
