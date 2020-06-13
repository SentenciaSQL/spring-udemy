package com.bolsadeideas.springboot.backend.apirest.angular.models.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bolsadeideas.springboot.backend.apirest.angular.models.entity.Cliente;

public interface IClienteDao extends JpaRepository<Cliente, Long> {

}
