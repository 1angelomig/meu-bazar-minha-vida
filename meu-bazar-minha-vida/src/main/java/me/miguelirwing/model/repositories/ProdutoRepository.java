package me.miguelirwing.model.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import me.miguelirwing.model.entities.Produto;

public interface ProdutoRepository extends JpaRepository<Produto, Integer>{
    
}
