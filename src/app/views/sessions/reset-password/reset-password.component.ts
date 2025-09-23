import { Component } from '@angular/core';
import { ResetPassword } from '../../../data/reset-password';
import { BaseService } from '../../../shared/services/base.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent {
data:ResetPassword = new ResetPassword;
constructor(private baseService: BaseService,
    private toastr: ToastrService,
  private route: ActivatedRoute,
private router:Router)
    {

    }


resetPassword(){
  const id = this.route.snapshot.paramMap.get('id');
  this.data.id = id;
 this.baseService.Post("Auth" , 'ResetPassword' , this.data).subscribe(res => {
   this.toastr.success('success');
   this.router.navigate(['/sessions/signin'])
 })
}

}
