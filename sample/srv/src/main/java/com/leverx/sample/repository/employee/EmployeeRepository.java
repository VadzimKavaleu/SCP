package com.leverx.sample.repository.employee;

import java.util.List;
import java.util.Optional;
import com.sap.cds.ql.cqn.CqnSelect;

import my.bookshop.Employee;

import com.leverx.sample.repository.Repository;

public interface EmployeeRepository extends Repository<Employee, String> {

    public void setSingleAttrById(String id, String prop, Object value);

    public List<Employee> getEmployeeByName(List<String> nameList);

	Optional<Employee> findById(String id);
	
	public List<Employee> runSelect(CqnSelect query);

}

