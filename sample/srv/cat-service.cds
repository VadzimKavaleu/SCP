using my.bookshop as my from '../db/cds/data-model';

service EmployeeService {
 @Capabilities : {
        Insertable : true,
        Updatable  : true,
        Deletable  : true
    }

 entity Employee as projection on my.Employee
        actions {
          action experience(experience: Boolean);
        }

 @Capabilities : {
                Insertable : true,
                Updatable  : true,
                Deletable  : true
            }

 entity Company as projection on my.Company
 actions {
    	function countEmployee() returns Integer;
    };

function hasUnexperiencedEmployee(coid: String) returns Boolean;


}