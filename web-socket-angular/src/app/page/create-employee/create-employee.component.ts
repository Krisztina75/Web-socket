import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/service/employee.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {
  employee: { name?: string, email?: string } = {};
  list$: Subject<any>;

  constructor(
    private employeeService: EmployeeService
  ) {
    this.list$ = this.employeeService.isData$;
  }

  ngOnInit() {
    // Feliratkozunk az employee.service.ts-ben az isConnected változásának figyelésére:
    this.employeeService.isConnected$.subscribe(
      connected => {
        // Amikor az isConnected true lesz, akkor hívjuk meg a read metódust a service-ből
        if (connected) {
          this.employeeService.read('employee');
        }
      }
    )
  }

  create(employee): void {
    this.employeeService.create(employee);
  }
}
