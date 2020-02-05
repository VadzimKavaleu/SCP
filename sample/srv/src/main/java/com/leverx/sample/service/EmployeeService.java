package com.leverx.sample.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.stereotype.Service;
import com.sap.cds.ql.cqn.CqnSelect;

import my.bookshop.Employee;
import my.bookshop.Company;
import com.leverx.sample.repository.employee.EmployeeRepository;
import com.leverx.sample.repository.company.CompanyRepository;

@Service
public class EmployeeService {
	
	private static final int RICH_EMPLOYEERS_COUNT = 3;
	

	
	@Autowired
	EmployeeRepository employeeRepository;
	
	@Autowired
	 CompanyRepository companyRepository;

	
/*	public boolean isValidMail(Stream<Employee> employee) {
		List<String> mailList = employee.map(Employee::getMail).collect(Collectors.toList());
		List<Employee> employeeList = employeeRepository.getEmployeeByName(mailList);
		boolean validMail = false;
		if (mailList.isEmpty()) {
			validMail = true;
		}
		return validMail;
	}*/
	
	public void setEmployeeExperience(CqnSelect query, boolean experience) {
		List<Employee> employeeList = employeeRepository.runSelect(query);
		if (!employeeList.isEmpty()) {
			Employee employee = employeeList.get(0);
			employeeRepository.setSingleAttrById(employee.getEmid(), "experience", experience);
		}
	}
	
	public int getNumberOfEmployee(CqnSelect query) {
		Company company = companyRepository.runSelectSingle(query);
		List<Employee> companyEmployee = companyRepository.getEmployeeByCompanyId(company.getCoid());
		return companyEmployee.size();
	}
	
	public boolean hasUnexperiencedEmployee(String coid) {
		return !companyRepository.getUnexperiencedEmployee(coid).isEmpty();
	}



	
	
}
