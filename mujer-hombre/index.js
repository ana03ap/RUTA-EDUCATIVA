
    data = [
      {
        'Genero Estd': 'f',
        PromedioCiencias: 48,
        PromedioIngles: 47,
        PromedioLecturaC: 52,
        PromedioMath: 50,
        PromedioSocialesC: 48,
        PromedioPuntGlobal: 248
      },
      {
        'Genero Estd': 'm',
        PromedioCiencias: 49,
        PromedioIngles: 48,
        PromedioLecturaC: 52,
        PromedioMath: 53,
        PromedioSocialesC: 49,
        PromedioPuntGlobal: 255
      }
    ]

    let womenData = Object.entries(data[0]).map(([Materia, promedio]) => ({
      Materia: Materia,
      promedio: promedio
    })).slice(1, -1);; 
    
    console.log(womenData);

    let menData = Object.entries(data[1]).map(([Materia, promedio]) => ({
      Materia: Materia,
      promedio: promedio
    })).slice(1, -1);; 
    
  

      function createHorizontalBarChart(selectedData, namebar) {
        const chartContainer = d3.select("#chart-genero");
        chartContainer.selectAll('*').remove(); //inicializa todo, un clear 
    
        const svgWidth = 500;
        const svgHeight = 400;
        const margin = { top: 20, right: 40, bottom: 60, left: 140 };
        const width = svgWidth - margin.left - margin.right;
        const height = svgHeight - margin.top - margin.bottom;
    
        const svg = chartContainer
            .append('svg')
            .attr('width', svgWidth)
            .attr('height', svgHeight)
            .append('g')
            .attr('transform', `translate(${margin.left},${margin.top})`);
    
        const yScale = d3.scaleBand()
            .domain(selectedData.map(d => d.Materia))
            .range([0, height])
            .padding(0.1);
    
        const xScale = d3.scaleLinear()
            .domain([0, d3.max(selectedData, d => d.promedio)])
            .nice()
            .range([0, width]);
    
        svg.selectAll('.bar')
            .data(selectedData)
            .enter().append('rect')
            .attr('class', `${namebar}`)
            .attr('y', d => yScale(d.Materia))
            .attr('x', 0)
            .attr('height', yScale.bandwidth())
            .attr('width', 0)
            .attr('fill', 'green')
            .on('click', function (event, d) {
                // Aquí puedes manejar eventos de clic en las barras
            })
            .transition()
            .duration(1000)
            .attr('width', d => xScale(d.promedio))
            .attr('height', yScale.bandwidth());
    
        svg.append('g')
            .attr('class', 'y-axis')
            .call(d3.axisLeft(yScale));
    
        svg.append('g')
            .attr('class', 'x-axis')
            .attr('transform', `translate(0,${height})`)
            .call(d3.axisBottom(xScale));
    
 
        svg.selectAll('.tick text')
            .style('font-family', 'Comfortaa, sans-serif');
    
        svg.selectAll('text')
            .style('font-family', 'Comfortaa, sans-serif');
    }
    
    createHorizontalBarChart(womenData, 'barf');
    
    d3.select("#mujer").on("click", () => {
        createHorizontalBarChart(womenData, 'barf');
    });
    
    d3.select("#hombre").on("click", () => {
        createHorizontalBarChart(menData, 'barm');
    });
    

