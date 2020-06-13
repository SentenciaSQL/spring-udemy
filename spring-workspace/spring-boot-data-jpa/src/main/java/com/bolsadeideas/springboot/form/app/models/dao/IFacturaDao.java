package com.bolsadeideas.springboot.form.app.models.dao;

import org.springframework.data.repository.CrudRepository;

import com.bolsadeideas.springboot.form.app.models.entity.Factura;

public interface IFacturaDao extends CrudRepository<Factura, Long> {

}
