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

import me.miguelirwing.model.entities.Lote;
import me.miguelirwing.model.entities.OrgaoFiscalizador;
import me.miguelirwing.model.repositories.LoteRepository;
import me.miguelirwing.model.repositories.OrgaoFiscalizadorRepository;

@RestController
public class OrgaoFiscalizadorRestController {

    @Autowired
    OrgaoFiscalizadorRepository rOrgf;

    @Autowired
    LoteRepository rLote;
    
    @CrossOrigin("*")
    @PostMapping("/orgf")
    public String create(@RequestBody OrgaoFiscalizador orgf){
        
        rOrgf.save(orgf);
        return "Criado com sucesso";

    }

    @CrossOrigin("*")
    @GetMapping("/orgf/{id}")
    public OrgaoFiscalizador read(@PathVariable("id") int id){
        
            OrgaoFiscalizador orgf = rOrgf.findById(id).get();
            if(orgf != null){
                return orgf;
            }
            
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);

    }

    @CrossOrigin("*")
    @PutMapping("/orgf/{id}")
    public String update(@RequestBody OrgaoFiscalizador newOrgf, @PathVariable("id") int id){
        
        OrgaoFiscalizador orgf = rOrgf.findById(id).get();
        orgf.setNome(newOrgf.getNome());
        orgf.setDescricao(newOrgf.getDescricao());
   
        rOrgf.save(orgf);
   
        return "Alterado com sucesso";

    }

    @CrossOrigin("*")
    @DeleteMapping("/orgf/{id}")
    public String delete(@PathVariable("id") int id){
       
        OrgaoFiscalizador orgf = rOrgf.findById(id).get();
        List<Lote> lotes = rLote.findAll();

        for (Lote lote : lotes) {
            if(lote.getOrgf() != null && lote.getOrgf().equals(orgf)){
                lote.setOrgf(null);
            }
        }
        
        rOrgf.delete(orgf);

        return "Deletado com sucesso";

    }

    @CrossOrigin("*")
    @GetMapping("/orgfs")
    public List<OrgaoFiscalizador> readAll(){
        
        return (List<OrgaoFiscalizador>) rOrgf.findAll();

    }
}
