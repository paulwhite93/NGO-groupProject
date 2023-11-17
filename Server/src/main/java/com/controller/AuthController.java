//package com.controller;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.ResponseEntity;
//import org.springframework.security.authentication.AuthenticationManager;
//import org.springframework.security.authentication.BadCredentialsException;
//import org.springframework.security.authentication.DisabledException;
//import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
//import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
//import org.springframework.security.core.Authentication;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.security.core.userdetails.UserDetailsService;
//import org.springframework.web.bind.annotation.RequestBody;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RequestMethod;
//import org.springframework.web.bind.annotation.RestController;
//
//import com.configuration.JwtTokenUtil;
//import com.dto.AuthenticationResponse;
//import com.entity.Users;
//import com.service.UserDetailsServiceImpl;
//
//@RestController
//@RequestMapping("/api/")
//public class AuthController extends WebSecurityConfigurerAdapter{
//	@Autowired
//	private AuthenticationManager authenticationManager;
//	
//	@Autowired
//	private UserDetailsServiceImpl userDetailsService;
//	
//	@Autowired
//	private JwtTokenUtil jwtUtil;
//	
//	@RequestMapping(value="/authentication",method=RequestMethod.POST)
//	public AuthenticationResponse LoginAuthenticationToken(@RequestBody Users user) throws BadCredentialsException{
//		try {
//			authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(user.getEmail(),user.getPassword()));
//		}catch(BadCredentialsException e) {
//			throw new BadCredentialsException("Incorrect email or password!");
//		}
//		final UserDetails userDetails = userDetailsService.loadUserByUsername(user.getEmail());
//		final String jwt = jwtUtil.generateToken(userDetails.getUsername());
//		return new AuthenticationResponse(jwt);
//		
//		
//	}
//	
//}
