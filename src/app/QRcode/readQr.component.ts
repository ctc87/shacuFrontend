import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BarcodeFormat } from '@zxing/library';
import { BehaviorSubject } from 'rxjs';
import { FormatsDialogComponent } from '../formats-dialog/formats-dialog.component';
import { AppInfoDialogComponent } from '../app-info-dialog/app-info-dialog.component';
import { UploadService } from '../_services/upload.service';
import { WorkflowService } from '../_services/workflow.service';
import { Router } from '@angular/router';


@Component({ 
    templateUrl: 'readQr.component.html',
    styleUrls: ['readQr.component.scss']
})
export class ReadQRComponent  {


  availableDevices: MediaDeviceInfo[];
  currentDevice: MediaDeviceInfo = null;

  formatsEnabled: BarcodeFormat[] = [
    BarcodeFormat.CODE_128,
    BarcodeFormat.DATA_MATRIX,
    BarcodeFormat.EAN_13,
    BarcodeFormat.QR_CODE,
  ];

  hasDevices: boolean;
  hasPermission: boolean;

  qrResultString: string;

  
  torchEnabled = false;
  torchAvailable$ = new BehaviorSubject<boolean>(false);
  tryHarder = false;

  regexp2 = /^(?:https:\/\/192.168.1.58\:4200\/)(Content\/qr\/[0-9]+)$/

  regexp = /^(?:https:\/\/192.168.1.58\:4200\/)(?:Content\/)(?:qr\/)([0-9]+)$/
  constructor(
    private readonly _dialog: MatDialog,
    public uploadService : UploadService,
    public router : Router,
    public  workflowService : WorkflowService,

    ) { 
      workflowService.startCountDown();
    }

  clearResult(): void {
    this.qrResultString = null;
  }

  onCamerasFound(devices: MediaDeviceInfo[]): void {
    this.availableDevices = devices;
    this.hasDevices = Boolean(devices && devices.length);
    this.workflowService.startCountDown();
  }
 
  async exist(resultString) {
    let exist, id;
    if(this.regexp.test(resultString)) {
      id = resultString.match(this.regexp)[1];
      exist = await this.uploadService.exist("qr", id);
    } else {
      exist = await false;
    }
    return {'exist':exist['exist'], "id":Number(id)};
  }

  async onCodeResult(resultString: string) {
    let result = await this.exist(resultString);
    if (result.exist) {
      if(!this.workflowService.itsRedable(result.id)) {
        this.qrResultString = "Existe Pero no estas cerca";
      } else {
        this.qrResultString = "Existe";
        resultString = resultString.match(this.regexp2)[1];
        this.router.navigate([resultString])

      }
    } else {
      this.qrResultString = "NO Existe";
    }
    //this.qrResultString = resultString;
    
  }

  onDeviceSelectChange(selected: string) {
    const device = this.availableDevices.find(x => x.deviceId === selected);
    this.currentDevice = device || null;
  }

  openFormatsDialog() {
    const data = {
      formatsEnabled: this.formatsEnabled,
    };

    this._dialog
      .open(FormatsDialogComponent, { data })
      .afterClosed()
      .subscribe(x => { if (x) { this.formatsEnabled = x; } });
  }

  onHasPermission(has: boolean) {
    this.hasPermission = has;
  }

  openInfoDialog() {
    const data = {
      hasDevices: this.hasDevices,
      hasPermission: this.hasPermission,
    };

    this._dialog.open(AppInfoDialogComponent, { data });
  }

  onTorchCompatible(isCompatible: boolean): void {
    this.torchAvailable$.next(isCompatible || false);
  }

  toggleTorch(): void {
    this.torchEnabled = !this.torchEnabled;
  }

  toggleTryHarder(): void {
    this.tryHarder = !this.tryHarder;
  }
}


