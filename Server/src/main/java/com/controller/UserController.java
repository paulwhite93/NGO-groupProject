package com.controller;

import java.util.List;
import java.util.Optional;

//import org.hibernate.annotations.common.util.impl.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PathVariable;
//import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.dto.AuthenticationResponse;
import com.entity.Users;
import com.service.AuthService;
import com.service.UserService;


@RestController
@RequestMapping("/user/")
public class UserController {
	@Autowired
	UserService us;
	@Autowired
	AuthService as;

	@RequestMapping(value="/register",method=RequestMethod.POST)
	public ResponseEntity<String> register(@RequestBody Users users){
		if(us.checkEmailExist(users)!=null) {
			return new ResponseEntity<>("Email is already taken!", HttpStatus.BAD_REQUEST);
		}
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
	
	@RequestMapping(value="/authentication",method=RequestMethod.POST)
	public ResponseEntity<?> authLogin(@RequestBody Users users){
		AuthenticationResponse jwt=as.authenticate(users);
		if(jwt==null) return new ResponseEntity<>("Invalid request for JWT", HttpStatus.BAD_REQUEST);
		return ResponseEntity.ok(jwt);
	}
	
	@RequestMapping(value="/delete/{id}",method=RequestMethod.DELETE)
	public ResponseEntity<?> deleteUser(@PathVariable int id){
		
		us.deleteById(id);
		return new ResponseEntity<>("User deleted successfully", HttpStatus.OK);
	}
	
	@RequestMapping(value="/update/{id}",method=RequestMethod.PUT)
	public ResponseEntity<?> editUder(@PathVariable int id, @RequestBody Users users){
		Optional<Users> u=us.updateUser(id,users);
		if(u.isEmpty()) return new ResponseEntity<>("User not found", HttpStatus.BAD_REQUEST);
		return new ResponseEntity<>("User edited successfully", HttpStatus.OK);
	}
	
	@RequestMapping(value="/display", method=RequestMethod.GET)
	public List<Users> displayUsers(){
		List<Users> li=us.viewUser();
		return li;
	}
	
	
}

