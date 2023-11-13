package com.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.entity.Users;
@Repository
public interface UserRepository extends JpaRepository<Users,Integer>{
	@Transactional
	@Query(value="select * from users where email=:email",nativeQuery=true)
	Users findByEmail(@Param(value="email") String email);
	
	@Transactional
	@Query(value="select * from users where email=:email and password=:password",nativeQuery=true)
	Users findByEmailPassword(@Param(value="email") String email,@Param(value="password") String password);
	
}
