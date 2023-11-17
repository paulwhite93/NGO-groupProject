package com.service;

import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.configuration.JwtTokenUtil;
import com.dto.AuthenticationResponse;
import com.entity.Users;
import com.repository.UserRepository;

import ch.qos.logback.classic.Logger;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthService {
	

	    Logger logger = (Logger) LoggerFactory.getLogger(AuthService.class);


	    @Autowired
	    UserRepository userRepository;

	    private final AuthenticationManager authenticationManager;
	    private final PasswordEncoder passwordEncoder;
	    private final JwtTokenUtil jwtTokenUtil;


	    public AuthenticationResponse authenticate(Users user) {

	        logger.info("AuthService");

	        Users u= userRepository.findByEmail(user.getEmail());


	        Authentication authentication = authenticationManager.authenticate(
	                new UsernamePasswordAuthenticationToken(
	                        user.getEmail(),
	                        user.getPassword()
	                )
	        );

	        if(authentication.isAuthenticated()){
	            SecurityContextHolder.getContext().setAuthentication(authentication);
	            String jwtToken = jwtTokenUtil.generateToken(u.getEmail());
	            return new AuthenticationResponse(jwtToken);
	        }else
	            return null;


	    }
}
