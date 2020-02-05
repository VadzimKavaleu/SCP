package com.leverx.sample.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import my.bookshop.Employee;
import my.bookshop.Company;
import com.leverx.sample.repository.company.CompanyRepositoryImpl;

@RestController
public class CompanyController {
	
	@Autowired
	private CompanyRepositoryImpl companyRepository;
	
	@PostMapping("/company")
	public Company createOwner(@RequestBody Company company) {
		return companyRepository.createCompany(company);
	}
	
	@GetMapping("/company/{id}/employee")
	public List<Employee> getCompanyEmployee(@PathVariable String id) {
		return companyRepository.getEmployeeByCompanyId(id);
	}
	
	@GetMapping("/company")
	public List<Company> getAllCompany() {
		return companyRepository.findAll();
	}
	
}
