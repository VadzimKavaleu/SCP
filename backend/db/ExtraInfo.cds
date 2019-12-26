using Employee from './Employee';
using Id from './Employee';

		entity Address {
		    key adid : Id;
		    emid : String(4);
		    city : String(100);
		    strt : String(100);
		    hnum : Integer;
		    phone: String(10);
		};

		entity Laptop {
		    key lpid : Id;
		    emid : String(4);
		    brand : String(100);


    		toEmployee : association to one Employee on toEmployee.emid = emid;
		};
