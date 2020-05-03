package com.form.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

import com.form.models.User;

@Controller
public class UserController {

	@GetMapping("/user")
	public String addUser(User user) {
		return "index";
	}
	
	@PostMapping("/user")
	public String viewUser(@ModelAttribute User user) {
		return "result";
	}
	
}
