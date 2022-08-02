package me.miguelirwing.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import me.miguelirwing.model.entities.Produto;
import me.miguelirwing.model.repositories.LoteRepository;
import me.miguelirwing.model.repositories.ProdutoRepository;

@RestController
public class ProdutoRestController {

    @Autowired
    ProdutoRepository rProduto;

    @Autowired
    LoteRepository rLote;

    @CrossOrigin("*")
    @PostMapping("/produto")
    public String create(@RequestBody Produto p){
        
        rProduto.save(p);

        return "Criado com sucesso";
    }

    @CrossOrigin("*")
    @GetMapping("/produto/{id}")
    public Produto read(@PathVariable("id") int id){

        Produto p = rProduto.findById(id).get();
        if(p != null){
            return p;
        }

        throw new ResponseStatusException(HttpStatus.NOT_FOUND);
    }

    @CrossOrigin("*")
    @PutMapping("/produto/{id}")
    public String update(@RequestBody Produto newP, @PathVariable("id") int id){

        Produto p = rProduto.findById(id).get();
        p.setDescricao(newP.getDescricao());
        p.setNome(newP.getNome());

        rProduto.save(p);

        return "Alterado com sucesso";
    }

    @CrossOrigin("*")
    @DeleteMapping("/produto/{id}")
    public String delete(@PathVariable("id") int id){

        rProduto.deleteById(id);

        return "Deletado com sucesso";

    }

    @CrossOrigin("*")
    @GetMapping("/produtos")
    public List<Produto> readAll(){

        return rProduto.findAll();

    }

    @CrossOrigin("*")
    @GetMapping("/produtoslote/{id}")
    public List<Produto> readLotesOrgd(@PathVariable("id") int id){
        
        return rLote.findById(id).get().getProdutos();

    }
    
}
