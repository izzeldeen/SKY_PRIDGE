import { Component, OnInit } from '@angular/core';
import { SharedAnimations } from 'src/app/shared/animations/shared-animations';
import { BaseService } from '../../../shared/services/base.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss'],
  animations: [SharedAnimations]
})
export class ForgotComponent implements OnInit {
emailAddress:string;
  constructor(  private baseService: BaseService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    
  }

  sendForgetPasswordEmail(){
    
    let form = {
      email:this.emailAddress
    }
    this.baseService.Post("Auth" , 'ForgetPassword' , form).subscribe(res => {
       this.toastr.success('success');
    })
  }

}
