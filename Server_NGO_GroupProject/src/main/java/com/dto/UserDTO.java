package com.dto;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.Entity.Users;


@Component
public class UserDTO {
	@Autowired
	private RoleDTO roleDTO;

    @Autowired
    private PasswordEncoder bCryptPasswordEncoder;

    public Users userModelToEntity(Users users){

        Users u = new Users();
        u.setName(users.getName());
        u.setPassword(this.bCryptPasswordEncoder.encode(users.getPassword()));
        System.out.println("In DTO: "+users.getRoles());
        u.setRoles(roleDTO.roleModelToEntity(users.getRoles()));
        
        return u;

    }
}
