package com.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.entity.Donation_Types;
import com.entity.Donations;

public interface DonoTypeRepository extends JpaRepository<Donation_Types,Integer> {

}
