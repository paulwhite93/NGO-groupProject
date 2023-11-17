package com.entity;

import java.util.Arrays;
import java.util.Collection;
import java.util.Set;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

@Entity
@Table(name="users")
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Users implements UserDetails {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO) 
	private int id;
	@NonNull
	private String name;
	@NonNull
	private String password;
	@NonNull
	private String email;
	@ManyToOne
    @JoinColumn(name = "role_id" , referencedColumnName = "id")
	@JsonIgnoreProperties(value = {"users"})
    private User_Roles roles;
	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		// TODO Auto-generated method stub
		System.out.println("user entity: "+roles.getRole_name());
		System.out.println(Arrays.asList(new SimpleGrantedAuthority(roles.getRole_name())));
		return Arrays.asList(new SimpleGrantedAuthority(roles.getRole_name()));
	}
	@Override
	public String getUsername() {
		// TODO Auto-generated method stub
		return this.email;
	}
	@Override
	public boolean isAccountNonExpired() {
		// TODO Auto-generated method stub
		return true;
	}
	@Override
	public boolean isAccountNonLocked() {
		// TODO Auto-generated method stub
		return true;
	}
	@Override
	public boolean isCredentialsNonExpired() {
		// TODO Auto-generated method stub
		return true;
	}
	@Override
	public boolean isEnabled() {
		// TODO Auto-generated method stub
		return true;
	}
	
}
