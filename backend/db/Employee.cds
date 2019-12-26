type Id : String(4);
using Laptop from './ExtraInfo';
using Address from './ExtraInfo';


entity Employee {
    key emid : Id;
    name : String(100);
    surname: String(100);
    email: String(100);

toAddress : association to one Address on toAddress.emid = emid;
toLaptop : association to many Laptop on toLaptop.emid = emid;

};
