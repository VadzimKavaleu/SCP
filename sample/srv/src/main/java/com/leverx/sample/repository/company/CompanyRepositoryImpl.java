package com.leverx.sample.repository.company;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import my.bookshop.Employee;
import my.bookshop.Employee_;
import my.bookshop.Company;
import my.bookshop.Company_;
import com.sap.cds.ql.Insert;
import com.sap.cds.ql.Select;
import com.sap.cds.ql.Update;
import com.sap.cds.ql.cqn.CqnInsert;
import com.sap.cds.ql.cqn.CqnSelect;
import com.sap.cds.ql.cqn.CqnUpdate;
import com.sap.cds.services.persistence.PersistenceService;
@Repository
public class CompanyRepositoryImpl implements CompanyRepository{
	
	@Autowired
	private PersistenceService persistenceService;

	
	@Override
	public Optional<Company> findById(String id) {
		CqnSelect query = Select.from(Company_.class).distinct().byId(id);
		return Optional.of(persistenceService.run(query).single().as(Company.class));
	}

	@Override
	public List<Company> findAll() {
		CqnSelect query = Select.from(Company_.class);
		return persistenceService.run(query).listOf(Company.class);
	}
	
	@Override
	public List<Employee> getEmployeeByCompanyId(String id) {
		CqnSelect query = Select.from(Employee_.class).where(employee -> employee.company_coid().eq(id));
		return persistenceService.run(query).listOf(Employee.class);
	}
	
	@Override
	public void setSingleAttrById(String id, String prop, Object value) {
		CqnUpdate query = Update.entity(Company_.class).byId(id).data(prop, value);
		persistenceService.run(query);
	}
	
	@Override
	public Company createCompany(Company company) {
		CqnInsert query = Insert.into(Company_.class).entry(company);
		return persistenceService.run(query).single().as(Company.class);
	}
	
	@Override
	public Company runSelectSingle(CqnSelect query) {
		return persistenceService.run(query).single().as(Company.class);
	}
	
	@Override
	public List<Employee> getUnexperiencedEmployee(String id) {
		CqnSelect query = Select.from(Employee_.class).byId(id).where(car -> car.experience().eq(false));
		return persistenceService.run(query).listOf(Employee.class);
	}

	

	
}
