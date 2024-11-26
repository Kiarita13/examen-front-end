import { isPlatformBrowser, NgFor, NgIf, TitleCasePipe } from "@angular/common";
import { Component, ElementRef, Inject, Input, PLATFORM_ID, ViewChild } from "@angular/core";
import { personajeDbz } from "../interfaces/dbz";


@Component({

    selector: 'dbz-modal',
    standalone: true,
    imports:[NgFor, TitleCasePipe, NgIf],
    templateUrl: './modal.component.html',
    styleUrl: './styles.css'


})

export class ModalComponent {

    @Input() public dbz: personajeDbz={
        name:'',
        ki:'',
        maxKi:'',
        race:'',
        gender:'',
        description:'',
        image:'',
    }as personajeDbz;


    private bootstrapModal: any;
    @ViewChild('modalElement') public modalElement!: ElementRef;


    constructor(@Inject(PLATFORM_ID)private plataformId: Object) { }

    ngAfterViewInit(): void {
        if (isPlatformBrowser(this.plataformId)) {
            this.initializeModal();
        }
    }

    initializeModal():void{
        import('bootstrap').then((bootstrap) => {
            this.bootstrapModal = new bootstrap.Modal(this.modalElement.nativeElement);
        })
    }

    open(dbz:personajeDbz):void{
        this.dbz = dbz;
        if(isPlatformBrowser(this.plataformId)){
            if(this.bootstrapModal){
            this.bootstrapModal.show();
        }else{
            this.initializeModal();
            setTimeout(() =>{
                this.bootstrapModal.show();
            }, 0);
        }
        }
    }

    close():void{
            this.bootstrapModal.hide();
    }
    
}
