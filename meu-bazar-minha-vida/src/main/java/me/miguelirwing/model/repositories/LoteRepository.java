package me.miguelirwing.model.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import me.miguelirwing.model.entities.Lote;

public interface LoteRepository extends JpaRepository<Lote, Integer>{
    
}
