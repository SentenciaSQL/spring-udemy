package com.bolsadeideas.springboot.di.app.models.sevice;

//@Primary
//@Component("miServicioSimple")
public class MiServicio implements IServicio{
	
	@Override
	public String operacion() {
		return "ejecutando algun proceso importante simple...";
	}

}
