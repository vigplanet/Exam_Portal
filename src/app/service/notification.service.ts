import { Injectable } from '@angular/core';
declare var $: any;
@Injectable({
    providedIn: 'root'
})
export class NotificationService {
    constructor(
    ) { }

    private showSnackBar(title: string, message: string, className: string, from: string, align: string, icon: string, animIn: number, animOut: number, delay: number): void {
        $.toastDefaults = {
            position: 'top-right', /** top-left/top-right/top-center/bottom-left/bottom-right/bottom-center - Where the toast will show up **/
            dismissible: true, /** true/false - If you want to show the button to dismiss the toast manually **/
            stackable: true, /** true/false - If you want the toasts to be stackable **/
            pauseDelayOnHover: true, /** true/false - If you want to pause the delay of toast when hovering over the toast **/
            style: {
                toast: '', /** Classes you want to apply separated my a space to each created toast element (.toast) **/
                info: '', /** Classes you want to apply separated my a space to modify the "info" type style  **/
                success: '', /** Classes you want to apply separated my a space to modify the "success" type style  **/
                warning: '', /** Classes you want to apply separated my a space to modify the "warning" type style  **/
                error: '', /** Classes you want to apply separated my a space to modify the "error" type style  **/
            }
        };
        $.toast({
            type: className,
            title: title,
            subtitle: '',
            content: message,
            delay: 500000,
            autohide: false
        });
    }
    public success(title: string, message: string, from = "", align = "", icon = "", animIn = 0, animOut = 0, delay = 0) {
        this.showSnackBar(title, message, 'success', from, align, icon, animIn, animOut, delay);
    }

    public error(title: string, message: string, from = "", align = "", icon = "", animIn = 0, animOut = 0, delay = 0) {
        this.showSnackBar(title, message, 'error', from, align, icon, animIn, animOut, delay);
    }

    public warninginfo(title: string, message: string, from = "", align = "", icon = "", animIn = 0, animOut = 0, delay = 0) {
        this.showSnackBar(title, message, 'warning', from, align, icon, animIn, animOut, delay);
    }

    public info(title: string, message: string, from = "", align = "", icon = "", animIn = 0, animOut = 0, delay = 0) {
        this.showSnackBar(title, message, 'info', from, align, icon, animIn, animOut, delay);
    }
}