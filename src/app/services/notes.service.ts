import { Injectable } from '@angular/core';
import { INote } from '../model/inote';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/compat/firestore'


@Injectable({
  providedIn: 'root'
})
export class NotesService {
  private dbPath = '/notes'
  notesRef!: AngularFirestoreCollection<any>

  public notes: INote[] = [];
  constructor(private db: AngularFirestore) {
    this.notesRef = db.collection(this.dbPath);

    //cargar todas las notas del SV
    this.notesRef.get().subscribe(d => {
      let docs = d.docs
      /* docs.forEach(d=>{
         let newD={id:d.id,...d.data()}
         this.notes.push(newD)
       
       })*/
      this.notes = docs.map(d => {
        return { id: d.id, ...d.data() }
      })

    })

  }

  public async createNote(newNote: INote) {


    try {
      let { id, ...newNoteWithoutID } = newNote
      let dRef: DocumentReference<any> = await this.notesRef.add({ ...newNoteWithoutID });
      newNote.id = dRef.id;
      this.notes.push(newNote)

    } catch (err) {
      console.error(err)


    }


  }

  public createNoteWithKey(key: string, newNote: INote) {
    return this.notesRef.doc(key).set(newNote, { merge: true })

  }


  public removeNote(id: any) {
    let newNotes = this.notes.filter((n) => {
      return n.id != id;
    });
    this.notes = newNotes;
    return this.notesRef.doc(id).delete()
  }



  public getNotes(): INote[] {
    return this.notes;
  }
  public getNotesById(id: string) {
    return this.notesRef.doc(id);
  }
  public updateNote(note: INote):Promise<void>{
    let idtobeupdated: any;
    let data: any;

    this.notes.forEach(n => {
      console.log(note.id)
      console.log(n.id)
      

      if (n.id == note.id) {
        console.log("entraaaa 2")
        n.title = note.title;
        n.description = note.description;
        let { id, ...newData } = note;
        idtobeupdated = id;
        data = newData;
      }
    });
    if (idtobeupdated) {
      console.log("no lo hace")
      console.log(idtobeupdated)
      console.log(data)

      return this.notesRef.doc(idtobeupdated as string).update(data);
    } else {
      console.log("no lo hace")
     return Promise.resolve();
    }
  }
}
