package com.zetcode.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

import com.zetcode.bean.User;

@Controller
public class MyController {
	
	@GetMapping("/addUser")
	public String sendForm(User user) {
		return "addUser";
	}
	
	@PostMapping("/addUser")
	public String processForm(@ModelAttribute User user) {
		return "showMessage";
	}

}
