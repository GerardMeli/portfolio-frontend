import { Component } from '@angular/core';
import { PortfolioComponent } from './portfolio.component/portfolio.component';

@Component({
  selector: 'app-root',
  imports: [PortfolioComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {}
