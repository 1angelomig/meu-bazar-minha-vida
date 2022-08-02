package me.miguelirwing.model.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import me.miguelirwing.model.entities.OrgaoDonatario;

public interface OrgaoDonatarioRepository extends JpaRepository<OrgaoDonatario, Integer>{
    
}
