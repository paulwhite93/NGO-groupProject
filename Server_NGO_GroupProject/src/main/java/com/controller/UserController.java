package com.controller;

//import org.hibernate.annotations.common.util.impl.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.Entity.Users;
import com.service.UserService;


@RestController
@RequestMapping("/user/")
public class UserController {
	@Autowired
	UserService us;

	@RequestMapping(value="/register",method=RequestMethod.POST)
	public ResponseEntity<String> register(@RequestBody Users users){
		if(us.checkEmailExist(users)!=null) {
			return new ResponseEntity<>("Email is already taken!", HttpStatus.BAD_REQUEST);
		}
		System.out.println(users.getRoles());
		us.adduser(users);
		
		return new ResponseEntity<>("User registered successfully", HttpStatus.OK);
	}
	
	@RequestMapping(value="/login",method=RequestMethod.POST)
	public ResponseEntity<String> login(@RequestBody Users users){
		if(us.checkuser(users)==null) {
			return new ResponseEntity<>("Invalid email or password", HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity<>("User logged in successfully", HttpStatus.OK);
	}
	
	
}

