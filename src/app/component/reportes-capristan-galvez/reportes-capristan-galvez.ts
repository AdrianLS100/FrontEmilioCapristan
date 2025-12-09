import {AfterViewInit, Component} from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import {DecimalPipe} from '@angular/common';
import {EvaluacionService} from '../../services/evaluacion-service';
import {
  ArcElement,
  BarController,
  BarElement,
  CategoryScale,
  Chart,
  Legend,
  LinearScale, PieController,
  Title,
  Tooltip
} from 'chart.js';

@Component({
  selector: 'app-reportes-capristan-galvez',
  imports: [
    MatTableModule,
    DecimalPipe
  ],
  templateUrl: './reportes-capristan-galvez.html',
  styleUrl: './reportes-capristan-galvez.css'
})
export class ReportesCapristanGalvez implements AfterViewInit {
  constructor(private ejcgEvaluacionService: EvaluacionService) { }
  public datos: { ejcgNombreCurso: string; ejcgPromedioNota: number }[] = [];
  public displayedColumns: string[] = ['nombre', 'promedio'];

  ngAfterViewInit(): void {
    //Registrar controladores de gráficos
    Chart.register(BarController, ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend, Title, PieController)

    this.ejcgEvaluacionService.listCount().subscribe(response => {
      this.datos = response;
      console.log(this.datos);
      const labels = response.map(x => x.ejcgNombreCurso);
      const data = response.map(x => x.ejcgPromedioNota);

      setTimeout(() =>{
        const ctx = document.getElementById('myChart') as HTMLCanvasElement;
        new Chart(ctx, {
          type: 'bar', ///pie o bar
          data: {
            labels: labels,
            datasets: [{
              label: 'Promedios',
              data: data,
              backgroundColor: ['red','blue','green','yellow','orange','purple']
            }]
          },
          options: {
            responsive: true,
            plugins: {
              legend: { display: true },
              title: { display: true, text: 'Promedio de nota por curso' }
            }
          }
        });
      }, 100)
    });
  }
}
