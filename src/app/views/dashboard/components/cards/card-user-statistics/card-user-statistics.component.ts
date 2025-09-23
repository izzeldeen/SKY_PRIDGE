import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from 'src/app/shared/models/employee.model';
import { BaseService } from 'src/app/shared/services/base.service';
import { EmployeeService } from 'src/app/shared/services/employee.service';

@Component({
  selector: 'app-card-user-statistics',
  templateUrl: './card-user-statistics.component.html',
  styleUrls: ['./card-user-statistics.component.scss']
})
export class CardUserStatisticsComponent implements OnInit {
  model:any;
  employees:Employee[];
  
  constructor(private router:Router,
    private employeeService:EmployeeService
  ) { }

  ngOnInit(): void {
    this.getEmployees();
  }


    getEmployees(){
    this.employeeService.getAllEmployees().subscribe(employees => {
   this.employees = employees;
});
  }


}
