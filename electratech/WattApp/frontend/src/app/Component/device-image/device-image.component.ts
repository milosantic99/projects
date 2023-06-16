import { Component,Input } from '@angular/core';
import { faPlus,faMinus} from '@fortawesome/free-solid-svg-icons'; 
import { ProsumerDeviceCard } from 'src/app/Models/prosumer-device-card';


@Component({
  selector: 'app-device-image',
  templateUrl: './device-image.component.html',
  styleUrls: ['./device-image.component.css']
})
export class DeviceImageComponent {


  @Input() info={} as ProsumerDeviceCard;

  getIconName() {
    return this.info.icon==='faMinus' ? this.faMinus : this.faPlus;
  }

  faPlus=faPlus;
  faMinus=faMinus;

}
