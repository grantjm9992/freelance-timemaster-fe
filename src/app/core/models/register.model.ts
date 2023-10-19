export class Register {
  name: string;
  surname: string;
  email: string;
  company_name: string;
  password: string;


  constructor(name: string, surname: string, email: string, company_name: string, password: string) {
    this.name = name;
    this.surname = surname;
    this.email = email;
    this.company_name = company_name;
    this.password = password;
  }
}
