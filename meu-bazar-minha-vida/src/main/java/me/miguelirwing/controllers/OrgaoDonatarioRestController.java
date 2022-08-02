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
import me.miguelirwing.model.entities.OrgaoDonatario;
import me.miguelirwing.model.repositories.LoteRepository;
import me.miguelirwing.model.repositories.OrgaoDonatarioRepository;

@RestController
public class OrgaoDonatarioRestController {

    @Autowired
    OrgaoDonatarioRepository rOrgd;

    @Autowired
    LoteRepository rLote;
    
    @CrossOrigin("*")
    @PostMapping("/orgd")
    public String create(@RequestBody OrgaoDonatario orgd){
       
        rOrgd.save(orgd);

        return "Criado com sucesso";

    }

    @CrossOrigin("*")
    @GetMapping("/orgd/{id}")
    public OrgaoDonatario read(@PathVariable("id") int id){
        
        OrgaoDonatario orgd = rOrgd.findById(id).get();
        if(orgd != null){
            return orgd;
        }

        throw new ResponseStatusException(HttpStatus.NOT_FOUND);

    }

    @CrossOrigin("*")
    @PutMapping("/orgd/{id}")
    public String update(@RequestBody OrgaoDonatario newOrgd, @PathVariable("id") int id){
        
        OrgaoDonatario orgd = rOrgd.findById(id).get();
        orgd.setNome(newOrgd.getNome());
        orgd.setDescricao(newOrgd.getDescricao());
        orgd.setEndereco(newOrgd.getEndereco());
        orgd.setTelefone(newOrgd.getTelefone());
        orgd.setHorarioFuncionamento(newOrgd.getHorarioFuncionamento());

        rOrgd.save(orgd);
        return "Alterado com sucesso";

    }

    @CrossOrigin("*")
    @DeleteMapping("/orgd/{id}")
    public String delete(@PathVariable("id") int id){
        
        OrgaoDonatario orgd = rOrgd.findById(id).get();
        List<Lote> lotes = rLote.findAll();
        for (Lote lote : lotes) {
            if(lote.getOrgd() != null && lote.getOrgd().equals(orgd)){
                lote.setOrgd(null);
            }
        }

        rOrgd.deleteById(id);

        return "Deletado com sucesso";

    }

    @CrossOrigin("*")
    @GetMapping("/orgds")
    public List<OrgaoDonatario> readAll(){

        return rOrgd.findAll();
        
    }
    
}
