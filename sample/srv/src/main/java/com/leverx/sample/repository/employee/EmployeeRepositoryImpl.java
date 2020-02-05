package com.leverx.sample.repository.employee;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import my.bookshop.Employee;
import my.bookshop.Employee_;
import com.sap.cds.ql.Select;
import com.sap.cds.ql.Update;
import com.sap.cds.ql.cqn.CqnSelect;
import com.sap.cds.ql.cqn.CqnUpdate;
import com.sap.cds.services.persistence.PersistenceService;

@Repository
public class EmployeeRepositoryImpl implements EmployeeRepository{
	
	@Autowired
	private PersistenceService persistenceService;
	
	
	@Override
	public Optional<Employee> findById(String id) {
		CqnSelect query = Select.from(Employee_.class).distinct().byId(id);
		return Optional.of(persistenceService.run(query).single().as(Employee.class));
	}

	
	@Override
	public List<Employee> findAll() {
		CqnSelect query = Select.from(Employee_.class);
		return persistenceService.run(query).listOf(Employee.class);
	}
	
	@Override
	public void setSingleAttrById(String id, String prop, Object value) {
		CqnUpdate query = Update.entity(Employee_.class).byId(id).data(prop, value);
		persistenceService.run(query);
	}
	
	@Override
	public List<Employee> getEmployeeByName(List<String> nameList) {
		CqnSelect query = Select.from(Employee_.class).where(employee -> employee.firstName().in(nameList.stream().toArray(String[]::new)));
		return persistenceService.run(query).listOf(Employee.class);
	}
	
	@Override
	public List<Employee> runSelect(CqnSelect query) {
		System.out.println(query);
		System.out.println(persistenceService);
		return persistenceService.run(query).listOf(Employee.class);
	}
	
	
	
}

