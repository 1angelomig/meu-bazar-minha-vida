package me.miguelirwing.controllers;

import java.util.ArrayList;
import java.util.Date;
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

import me.miguelirwing.model.entities.Lote;
import me.miguelirwing.model.entities.OrgaoDonatario;
import me.miguelirwing.model.repositories.LoteRepository;
import me.miguelirwing.model.repositories.OrgaoDonatarioRepository;

@RestController
public class LoteRestController {
    
    @Autowired
    LoteRepository rLote;

    @Autowired
    OrgaoDonatarioRepository rOrgd;
    
    @CrossOrigin("*")
    @PostMapping("/lote")
    public String create(@RequestBody Lote l){

        rLote.save(l);

        return "Criado com sucesso";

    }

    @CrossOrigin("*")
    @GetMapping("/lote/{id}")
    public Lote read(@PathVariable("id") int id){

        Lote lote = rLote.findById(id).get();
        if(lote != null){
            return lote;
        }

        throw new ResponseStatusException(HttpStatus.NOT_FOUND);

    }
    
    @CrossOrigin("*")
    @PutMapping("/lote/{id}")
    public String update(@RequestBody Lote newLote, @PathVariable("id") int id){

        Lote lote =  rLote.findById(id).get();
        lote.setObservacao(newLote.getObservacao());
        lote.setOrgd(newLote.getOrgd());
        lote.setOrgf(newLote.getOrgf());
        lote.setProdutos(newLote.getProdutos());

        rLote.save(lote);

        return "Alterado com sucesso";
    }

    @CrossOrigin("*")
    @DeleteMapping("/lote/{id}")
    public String delete(@PathVariable("id") int id){

        Lote lote = rLote.findById(id).get();
        
        Date adding30minutes = new Date(lote.getDataEntrega().getTime() + (30 * 60 * 1000));

        Date atual = new Date();

        if(atual.after(adding30minutes)){
            return "Prazo para deleter expirou";
        } else {
            rLote.delete(lote);
            return "Deletado com sucesso";
        }

    }

    @CrossOrigin("*")
    @GetMapping("/lotes")
    public List<Lote> readAll(){

        return rLote.findAll();

    }

    @CrossOrigin("*")
    @GetMapping("/lotesorgd/{id}")
    public List<Lote> readLotesOrgd(@PathVariable("id") int id){
        List<Lote> lotes = new ArrayList<>();
        OrgaoDonatario orgd = rOrgd.findById(id).get();

        for (Lote lote : rLote.findAll()) {
            if(lote.getOrgd() != null && lote.getOrgd().equals(orgd)){
                lotes.add(lote);
            }
        }

        return lotes;
    }

}
