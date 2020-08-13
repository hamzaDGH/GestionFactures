
import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpEvent } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { DATE_FORMAT } from '../../shared/constants/input.constants';
import { JustificatifService } from './justificatif.service';
import { IJustificatif, Justificatif } from '../../shared/model/justificatif.model';
import { OrderPipe } from 'ngx-order-pipe';
import { delay } from 'rxjs/operators';


type SelectableEntity = IJustificatif;

@Component({
  selector: 'app-justificatif-update',
  templateUrl: './justificatif-update.component.html',
  styleUrls: ['./justificatif-update.component.scss']
})
export class JustificatifUpdateComponent implements OnInit {
  public order: string = "justificatifHasArticle.article.productDesc"
  public sortedJustificatifHasArticles: any;
  public reverse: boolean = false;

  justificatif: IJustificatif;

  justificatifs?: IJustificatif[] = [];

  currentSearch: string;
  pageNumber: number = 1;
  selectedFile: File;
  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;
  message: string;
  imageName: any;

  editForm = this.fb.group({
    id: [],
    nom: [],
    type: [],
    picByte: ['picByte',this.selectedFile]
  });
  constructor(
    protected justificatifService: JustificatifService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    /* this.activatedRoute.data.subscribe(({ justificatif }) => {
      this.updateForm(justificatif);
    }); */
  }
  public onFileChanged(event) {
    //Select File
    this.selectedFile = event.target.files[0];
  }

  //Gets called when the user clicks on submit to upload the image
  onUpload() {
    console.log(this.selectedFile);
    
    //FormData API provides methods and properties to allow us easily prepare form data to be sent with POST HTTP requests.
    const uploadImageData = new FormData();
    uploadImageData.append('imageFile', this.selectedFile, this.selectedFile.name);
  
    //Make a call to the Spring Boot Application to save the image
    this.justificatifService.create(uploadImageData).subscribe((response) =>{
      if (response.status === 200) {
        this.message = 'Image uploaded successfully';
      } else {
        this.message = 'Image not uploaded successfully';
      }
    });
    
  }    //Gets called when the user clicks on retieve image button to get the image from back end
    getImage() {
    //Make a call to Sprinf Boot to get the Image Bytes.
    this.justificatifService.find(this.imageName).subscribe(res => {
      this.retrieveResonse = res;
          this.base64Data = this.retrieveResonse.picByte;
          this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
    });
  }




/*   updateForm(justificatif: IJustificatif): void {
    this.justificatif = justificatif;
    this.editForm.patchValue({
      id: justificatif.id,
      nomJustificatif: justificatif.nomJustificatif,
      secteur: justificatif.secteur,
    });

  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    const justificatif = this.createFromForm();


    alert('save');

    if (justificatif.id === undefined) {
      this.subscribeToSaveJustificatifResponse(this.justificatifService.create(justificatif));
    } else {
      this.subscribeToSaveJustificatifResponse(this.justificatifService.update(justificatif));
    }
  }
  private createFromForm(): IJustificatif {

    console.log('test createForm');
    return {
      ...new Justificatif(),
      id: this.editForm.get(['id'])!.value,
      nomJustificatif: this.editForm.get(['nomJustificatif'])!.value,
      secteur: this.editForm.get(['secteur'])!.value,
    }
  }

  protected subscribeToSaveJustificatifResponse(result: Observable<HttpResponse<IJustificatif>>): void {
    result.subscribe(
      (value) => this.onSaveSuccess(value
      ),

      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(value): void {
    this.justificatif = value.body;
    this.previousState();
  }

  protected onSaveError(): void {
    //add error management
  }

  trackById(index: number, item: SelectableEntity): any {
    return item.id;
  } */
}
