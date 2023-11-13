package com.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.entity.Users;
import com.dto.UserDTO;
import com.repository.UserRepository;

@Service
public class UserService {
	@Autowired
	UserRepository ur;
	@Autowired
	UserDTO userDTO;
	@Autowired
	PasswordEncoder bCryptPasswordEncoder;
	public void adduser(Users users) {
		Users u = userDTO.userModelToEntity(users);
		System.out.println("In service: "+u.getRoles());
		ur.save(u);
	}
	
	public Users checkEmailExist(Users users) {
		return ur.findByEmail(users.getEmail());
	}
	
	public Users checkuser(Users users) {
		Users correctUser = checkEmailExist(users);
		boolean b=bCryptPasswordEncoder.matches(users.getPassword(), correctUser.getPassword());
		if(b==true) return users;
		else return null;
	}
}