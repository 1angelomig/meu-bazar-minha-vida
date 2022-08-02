package me.miguelirwing.model.entities;

import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

import org.hibernate.annotations.CreationTimestamp;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Entity
public class Lote {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int id;

    @CreationTimestamp
    Date dataEntrega;
    String observacao;

    @OneToOne
    @JoinColumn(name = "orgf_fk")
    OrgaoFiscalizador orgf;

    @OneToOne
    @JoinColumn(name = "orgd_fk")
    OrgaoDonatario orgd;

    @OneToMany(targetEntity = Produto.class, cascade = CascadeType.ALL)
    @JoinColumn(name = "lt_fk")
    List<Produto> produtos;
}
