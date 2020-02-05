namespace my.bookshop;


entity Employee {
key emid : String;
firstName : String not null;
lastName : String not null;
mail: String;
experience: Boolean default false;
company: Association to Company;


}

entity Company {
  key coid : String;
  name  : String not null;
  address  : String;
  employee: Association to many Employee on employee.company = $self;
}