package com.leverx.sample.repository.company;

import java.util.List;

import my.bookshop.Employee;
import my.bookshop.Company;
import com.leverx.sample.repository.Repository;
import com.sap.cds.ql.cqn.CqnSelect;

public interface CompanyRepository extends Repository<Company, String> {	


	public void setSingleAttrById(String string, String prop, Object value);
	
	public Company createCompany(Company company);


	public List<Employee> getEmployeeByCompanyId(String coid);
	
	public Company runSelectSingle(CqnSelect query);
	
	public List<Employee> getUnexperiencedEmployee(String id);




	
}
