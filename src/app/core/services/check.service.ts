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
    public successCallback: () => void;
    constructor(
        private apiService: CheckApiService,
        private modalService: NgbModal,
        private utils: Utils
    ) {
    }

    public addManualCheck(user: User, check: any = false): void {
        const modalRef: NgbModalRef = this.modalService.open(AddManualCheckModalComponent, {
            centered: true
        });
        if (check) {
            modalRef.componentInstance.check = this.getFormDataFromEntity(check);
            modalRef.componentInstance.onDelete = (): void => {
                this.deleteManualCheck(check.id);
            }
        }
        modalRef.componentInstance.onSubmit = (): void => {
            let formValue = modalRef.componentInstance.form.value;
            let entity = {...formValue, ...{
                date_ended: `${this.utils.getDateString(formValue.date_start)} ${this.utils.getTimeString(formValue.time_end)}`,
                date_started: `${this.utils.getDateString(formValue.date_start)} ${this.utils.getTimeString(formValue.time_start)}`,
                user_id: user.id,
                status: 'closed',
            }};
            if (check) {
                this.updateManualCheck(entity, check.id);
                return;
            }
            this.createManualCheck(entity);
        }
    }

    public getFormDataFromEntity(check: any) {
        return  {...check, ...{
            date_start: this.utils.getDateFromString(check.date_started),
            time_start: this.utils.getTimeFromString(check.date_started),
            time_end: this.utils.getTimeFromString(check.date_ended),
        }};
    }


    private updateManualCheck(formValue: any, id: string): void {
        this.apiService.update(id, formValue).subscribe(() => {
            Swal.fire({
                icon: "success",
                title: "Success",
                text: "Time updated successfully",
            }).then(() => {
                if (this.successCallback) {
                    this.successCallback();
                }
            });
        });
    }

    private deleteManualCheck(id: string): void {
        Swal.fire({
            icon: 'warning',
            title: 'Are you sure?',
            text: 'Are you sure you want to delete this worked time?',
            showConfirmButton: true,
            showDenyButton: true,
        }).then((response) => {
            if (response.isConfirmed) {
                this.apiService.remove(id).subscribe(() => {
                    if (this.successCallback) {
                        this.successCallback();
                    }
                })
            }
        });
    }
    private createManualCheck(formValue: any): void {
        this.apiService.create(formValue).subscribe(() => {
            Swal.fire({
                icon: "success",
                title: "Success",
                text: "Time added successfully",
            }).then(() => {
                if (this.successCallback) {
                    this.successCallback();
                }
            });
        });
    }
}
