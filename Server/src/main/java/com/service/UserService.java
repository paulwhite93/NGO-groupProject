package com.service;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

import org.aspectj.apache.bcel.classfile.Module.Uses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

//import com.controller.UserAuthority;
import com.entity.Users;
import com.repository.UserRepository;

@Service
public class UserService {
	@Autowired
	UserRepository ur;
	@Autowired
	PasswordEncoder bCryptPasswordEncoder;
	public void adduser(Users users) {
		users.setPassword(bCryptPasswordEncoder.encode(users.getPassword()));
		ur.save(users);
	}
	
	public Users checkEmailExist(Users users) {
		return ur.findByEmail(users.getEmail());
	}
	
	public Users checkuser(Users users) {
		Users correctUser = checkEmailExist(users);
		if(correctUser==null) return null;
		boolean b=bCryptPasswordEncoder.matches(users.getPassword(), correctUser.getPassword());
		if(b==true) return users;
		else return null;
	}

	public void deleteById(int id) {
		// TODO Auto-generated method stub
		Optional<Users> u = ur.findById(id);
		Collection<? extends GrantedAuthority> myAuthority=u.get().getAuthorities();
		System.out.println("UserService delete: "+myAuthority);
//		if(myAuthority==)
		ur.deleteById(id);
	}

	public Optional<Users> updateUser(int id,Users users) {
		// TODO Auto-generated method stub	
		if(ur.findById(id)==null) return null;
		String password=bCryptPasswordEncoder.encode(users.getPassword());
		ur.updateById(id,users.getName(),users.getEmail(),password,users.getRoles().getId());
		return ur.findById(id);		
	}

	public List<Users> viewUser() {
		// TODO Auto-generated method stub
		return ur.findAll();
	}
}