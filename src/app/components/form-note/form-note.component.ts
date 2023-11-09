import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NotesService } from 'src/app/services/notes.service';
import { INote } from 'src/app/model/inote';

@Component({
  selector: 'app-form-note',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './form-note.component.html',
  styleUrls: ['./form-note.component.css']
})
export class FormNoteComponent implements OnInit,OnChanges {
public alert:boolean=false
 
  @Input() note!:INote
  @Output() onsubmit=new EventEmitter<INote>()
  /*@ViewChild('title') title!:ElementRef
  public description!:string*/
  public form:FormGroup 
  constructor(private fb:FormBuilder){
    this.form=this.fb.group({
      title:['',Validators.required],
      description:['',Validators.required],
      id:['']
    })
  
  }
  ngOnChanges(changes: SimpleChanges): void {
      if (this.note && this.note.id){
        this.form.setValue(this.note)
      }
  }
  ngOnInit(): void {
    
  }

  submit(){
    let newNote:INote = {
      id:this.form.value.id,
      title: this.form.value.title,
      description: this.form.value.description
      }
      this.onsubmit.emit(newNote);
      this.form.reset()
     this.showAlert()
  }
  showAlert() {
    this.alert = true;
    setTimeout(() => {
      this.alert = false;
    }, 2000);
   
  }

}
