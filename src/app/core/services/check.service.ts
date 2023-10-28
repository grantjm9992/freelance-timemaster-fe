import {Injectable} from "@angular/core";
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {
    AddManualCheckModalComponent
} from "../../views/time-tracking-context/add-manual-check-modal/add-manual-check-modal.component";
import {User} from "../models/user.model";
import {Utils} from "./utils";
import Swal from "sweetalert2";
import {CheckApiService} from "./check.api.service";

@Injectable({
    providedIn: 'root'
})
export class CheckService {
    constructor(
        private apiService: CheckApiService,
        private modalService: NgbModal,
        private utils: Utils
    ) {
    }

    public addManualCheck(user: User): void {
        const modalRef: NgbModalRef = this.modalService.open(AddManualCheckModalComponent, {
            centered: true
        });
        modalRef.componentInstance.onSubmit = (): void => {
            let formValue = modalRef.componentInstance.form.value;
            let entity = {...formValue, ...{
                date_ended: `${this.utils.getDateString(formValue.date_start)} ${this.utils.getTimeString(formValue.time_end)}`,
                date_started: `${this.utils.getDateString(formValue.date_start)} ${this.utils.getTimeString(formValue.time_start)}`,
                user_id: user.id,
                status: 'closed',
            }};
            this.createManualCheck(entity);
        }
    }

    private createManualCheck(formValue: any): void {
        this.apiService.create(formValue).subscribe(() => {
            Swal.fire({
                icon: "success",
                title: "Success",
                text: "Time added successfully",
            });
        });
    }
}
