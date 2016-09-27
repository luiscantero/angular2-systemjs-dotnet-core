import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'nest-me',
    templateUrl: 'app/nestme.component.html',
    styleUrls: ['app/nestme.component.css'],
})
export class NestmeComponent {
    // Public API.
    @Input() myName: string;
    @Output() sendHello = new EventEmitter();

    sayHello(): void {
        this.sendHello.emit("Hello " + this.myName);
    }
}