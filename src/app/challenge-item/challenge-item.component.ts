import {Component, Input} from '@angular/core';
import {Challenge} from '../challenge.service';
import {NgIf} from '@angular/common';
import {buildCssProperty, buildStyle, ColorSchema} from '../color.service';

@Component({
  selector: 'app-challenge-item',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './challenge-item.component.html',
  styleUrls: ['./challenge-item.component.css']
})
export class ChallengeItemComponent {
  @Input() challenge:Challenge | undefined

  @Input() colorSchema!:ColorSchema

  protected readonly buildStyle = buildStyle;
  protected readonly buildCssProperty = buildCssProperty;
}
