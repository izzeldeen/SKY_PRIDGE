import { Component, OnInit } from '@angular/core';
import { EChartsOption } from 'echarts';
import { echartStyles } from '../../../shared/echart-styles';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
	selector: 'app-dashboad-default',
	templateUrl: './dashboad-default.component.html',
	styleUrls: ['./dashboad-default.component.css']
})
export class DashboadDefaultComponent implements OnInit {
    salesChartPie: EChartsOption;

    lineChart1;
	chartLineSmall1: any;
	products$: any;

	constructor(
		private productService: ProductService
	) { }

	ngOnInit() {
        this.salesChartPie = {
            color: ['#62549c', '#7566b5', '#7d6cbb', '#8877bd', '#9181bd', '#6957af'],
            tooltip: {
                show: true,
				// position: ['50%', '50%'],
				// position: [10, 10],
                backgroundColor: 'rgba(0, 0, 0, .8)',
                textStyle: {
                    color: 'white'
                }
            },

            xAxis: [{
                    axisLine: {
                        show: false
                    },
                    splitLine: {
                        show: false
                    }
                }

            ],
            yAxis: [{
                    axisLine: {
                        show: false
                    },
                    splitLine: {
                        show: false
                    }
                }
            ],
            series: [{
                    name: 'Shipment by Status',
                    type: 'pie',
                    radius: '75%',
                    center: ['50%', '50%'],
                    data: [
                        { value: 535, name: 'Shipped' },
                        { value: 310, name: 'At Clearance' },
                        { value: 234, name: 'Unable to Locate' },
                        { value: 155, name: 'Return to origin' },
                        { value: 130, name: 'Out the Delivery' },
                        { value: 348, name: 'Delivered' }
                    ],
					label: {
						color: '#605697'
					},
                    itemStyle: {
                        // emphasis: {
                        //     shadowBlur: 10,
                        //     shadowOffsetX: 0,
                        //     shadowColor: 'rgba(0, 0, 0, 0.5)'
                        // }
                    }
                }
            ]
        };

        this.chartLineSmall1 = {
			...echartStyles.defaultOptions, ...{
				grid: echartStyles.gridAlignLeft,
				series: [{
					type: 'line',
					data: [30, 40, 20, 50, 40, 80, 90, 40],
					smooth: true,
					lineStyle: {
						color: '#4CAF50',
						...echartStyles.lineShadow
					},
					itemStyle: {
						color: '#4CAF50'
					}
				}]
			}
		};
		this.lineChart1 = {
			...echartStyles.lineFullWidth, ...{
				series: [{
					type: 'line',
					data: [80, 40, 90, 20, 80, 30, 90, 30, 80, 10, 70, 30, 90],
					smooth: true,
					markArea: {
						label: {
							show: true
						}
					},
					areaStyle: {
						color: 'rgba(102, 51, 153, .15)',
						origin: 'start'
					},
					lineStyle: {
						// width: 1,
						color: 'rgba(102, 51, 153, 0.68)',
					},
					itemStyle: {
						color: '#2f47c2'
					}
				}, {
					type: 'line',
					data: [20, 80, 40, 90, 20, 80, 30, 90, 30, 80, 10, 70, 30],
					smooth: true,
					markArea: {
						label: {
							show: true
						}
					},
					areaStyle: {
						color: 'rgba(255, 152, 0, 0.15)',
						origin: 'start'
					},
					lineStyle: {
						// width: 1,
						color: 'rgba(255, 152, 0, .6)',
					},
					itemStyle: {
						color: 'rgba(255, 152, 0, 1)'
					}
				}]
			}
		};
		this.products$ = this.productService.getProducts();
	}

}
