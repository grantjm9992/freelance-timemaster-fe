export class Company {
  id: string;
  name: string;
  configuration: {
    auto_approve_checks: boolean;
    auto_approve_manual_checks: boolean;
    automatic_check_out_time: string;
  };
}

export class CompanyResponse {
  data: Company;
}
