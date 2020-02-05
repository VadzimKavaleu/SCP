package com.leverx.sample.handlers;

import java.util.Optional;
import java.util.stream.Stream;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.sap.cds.services.handler.EventHandler;
import com.sap.cds.services.handler.annotations.On;
import com.sap.cds.services.handler.annotations.After;
import com.sap.cds.services.handler.annotations.Before;
import com.sap.cds.services.handler.annotations.ServiceName;
import com.sap.cds.services.ErrorStatuses;
import com.sap.cds.services.ServiceException;
import com.sap.cds.services.EventContext;
import com.leverx.sample.context.CountEmployeeEventContext;
import com.leverx.sample.context.HasUnexperiencedEmployeeEventContext;
import com.sap.cds.services.cds.CdsCreateEventContext;
import com.sap.cds.services.cds.CdsService;
import com.sap.cds.ql.cqn.CqnSelect;

import my.bookshop.Employee;
import my.bookshop.Company;
import com.leverx.sample.service.EmployeeService;


import employeeservice.EmployeeService_;
import employeeservice.Employee_;
import employeeservice.Company_;

@Component
@ServiceName(EmployeeService_.CDS_NAME)
public class EmployeeServiceHandler implements EventHandler {
	
	@Autowired
	EmployeeService employeeService;
	
	@On(event = "experience", entity = Employee_.CDS_NAME)
	public void setExperience(EventContext context) {
		employeeService.setEmployeeExperience((CqnSelect)context.get("cqn"), (boolean)context.get("experience"));
		context.setCompleted();
	}
	
	@On(event = "countEmployee", entity = Company_.CDS_NAME)
	public void countEmployee(CountEmployeeEventContext context) {
		int numberOfEmployee = employeeService.getNumberOfEmployee((CqnSelect)context.getCqn());
		context.setResult(numberOfEmployee);
		context.setCompleted();
	}
	
	@On(event = "hasUnexperiencedEmployee")
	public void hasUnexperiencedEmployee(HasUnexperiencedEmployeeEventContext context) {
		boolean hasUnexperiencedEmployee = employeeService.hasUnexperiencedEmployee(context.getCompanyId());
		context.setResult(hasUnexperiencedEmployee);
		context.setCompleted();
	}


	
/*	@Before(event = CdsService.EVENT_CREATE, entity = Employee_.CDS_NAME)
	public void checkExistingName(Stream<Employee> employee) {
		if (!employeeService.isValidMail(employee)) {
			throw new ServiceException(ErrorStatuses.CONFLICT, "VIN duplicate error!");
		}
	}*/

}
