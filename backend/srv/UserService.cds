using Address as _Address from '../db/ExtraInfo';
using Laptop as _Laptop from '../db/ExtraInfo';
using Employee as _Employee from '../db/Employee';


service odata {

   entity Address @(
		title: 'Address',
		Capabilities: {
			InsertRestrictions: {Insertable: false},
			UpdateRestrictions: {Updatable: false},
			DeleteRestrictions: {Deletable: false}
		}
	) as projection on _Address;



	 entity Employee @(
    		title: 'Employee',
    		Capabilities: {
    			InsertRestrictions: {Insertable: false},
    			UpdateRestrictions: {Updatable: false},
    			DeleteRestrictions: {Deletable: false}
    		}
    	) as projection on _Employee;

    	 entity Laptop @(
            		title: 'Laptop',
            		Capabilities: {
            			InsertRestrictions: {Insertable: false},
            			UpdateRestrictions: {Updatable: false},
            			DeleteRestrictions: {Deletable: false}
            		}
            	) as projection on _Laptop;



}
