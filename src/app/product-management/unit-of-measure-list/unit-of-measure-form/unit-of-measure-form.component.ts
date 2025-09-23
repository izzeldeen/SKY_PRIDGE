import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BaseService } from 'src/app/shared/services/base.service';
import { LanguageService } from 'src/app/shared/services/language.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { OverlayContainer, ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-unit-of-measure-form',
  templateUrl: './unit-of-measure-form.component.html',
  styleUrls: ['./unit-of-measure-form.component.scss']
})
export class UnitOfMeasureFormComponent {
isFormSubmitted:boolean = false;
  logoFile:any;
  currencies:any[];
  unitOfMeasures:any[] = [];
    @Input() modal: any = null
    @Input() isEditMood: boolean = false
    @Input() id: number
    private entity: any = null;
   
    form = new FormGroup
    (
      {
        id: new FormControl(0),
        name : new FormControl('', [Validators.required]),
        code: new FormControl('', [Validators.required ]),
        isActive:new FormControl(false),
        childs:new FormControl(),
        templateName: new FormControl('', [Validators.required])

      }
    );
    //#endregion
    constructor
    (
      private baseService: BaseService,
      private languageService: LanguageService,
      public authSerivce: AuthService,
      private overlay: OverlayContainer,
      private toastr: ToastrService,
      private translate: TranslateService
    ) 
    {}
    ngOnInit (): void 
    {
      
      if (this.isEditMood && this.id) {
        this.GetById();

      }else {
        this.addRow();
      }
    }
    //#region Functions
    resetForm () 
    {
       this.form.reset();
    }
    submitForm (): void 
    {
        this.isFormSubmitted = true
    if (this.form.invalid || !this.unitOfMeasures.every(x=> x.name && x.value >= 0))
    {
      this.form.markAllAsTouched();
          this.toastr.error(
       this.translate.instant( 'error'),
       this.translate.instant("errors.invalidunitofMeasuers"),
    { timeOut: 3000 }
  );
      return;
    }
    const ApiPath = this.isEditMood ? 'Update' : 'Post';
    const ControllerPath = 'UnitOfMeasure'
    
    let form = this.form.getRawValue();
    form.childs = this.unitOfMeasures;
    this.baseService.Post(ControllerPath , ApiPath , form).subscribe
    ( res => { this.modal.close();

       this.toastr.success(
       this.translate.instant(this.isEditMood ? 'successUpdated' : "successAdded"),
       this.translate.instant("success"),
    { timeOut: 3000 }
  );
     }
    )
 
    }

      private GetById() {
    this.baseService.Get('UnitOfMeasure', `Get/${this.id}`).subscribe
      (res => {
        this.entity = res;
        this.form.patchValue
          (
            {
                id: this.entity.id,
                name: this.entity.name,
                code: this.entity.code,
                isActive: this.entity.isActive,
                templateName:this.entity.templateName
            }
          );
          
          this.unitOfMeasures = this.entity.childs;
          // this.unitOfMeasures.push({id:this.entity.id , name:this.entity.name})
          let i = 0;
          this.unitOfMeasures.forEach(item => item.index = i++)
      }
      )
  }

    addRow(){
      this.unitOfMeasures.push(
      {index: this.unitOfMeasures.length, id:0 , value: 0 , code:null , name:null}
      )
    }

    removeRow(index){
  this.unitOfMeasures = this.unitOfMeasures.filter(x=> x.index != index);
  let i = 0;
  this.unitOfMeasures = this.unitOfMeasures.map(item => {
    item.index = i;
    i++;
    return item;
  })
}

}
