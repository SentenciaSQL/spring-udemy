package com.bolsadeideas.springboot.di.app.models.sevice;

//@Component("miServicioPrincipal")
public class MiServicioComplejo implements IServicio{
	
	@Override
	public String operacion() {
		return "ejecutando algun proceso importante complicado...";
	}

}
