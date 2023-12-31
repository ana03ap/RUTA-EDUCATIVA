// Datos




        datos = [
            {
              cole_naturaleza: 'oficial',
              naturales: 47,
              Ingles: 45,
              Lectura: 51,
              Math: 50,
              Sociales: 47,
              Global: 244
            },
            {
              cole_naturaleza: 'no oficial',
              naturales: 53,
              Ingles: 54,
              Lectura: 57,
              Math: 56,
              Sociales: 54,
              Global: 277
            }
          ]

// nuevo data 
          data = [
            { category: "Math", value1: datos[0].Math, value2: datos[1].Math },
            { category: "Sociales", value1: datos[0].Sociales, value2: datos[1].Sociales },
            { category: "Lectura", value1: datos[0].Lectura, value2: datos[1].Lectura },
            { category: "Ingles", value1: datos[0].Ingles, value2: datos[1].Ingles },
            { category: "Naturales", value1: datos[0].naturales, value2: datos[1].naturales }
        ];
        console.log("data desde colegios")
          console.log(data);

           svgWidth = 900;
           svgHeight = 600;

           margin = { top: 20, right: 30, bottom: 60, left: 60 };
           width = svgWidth - margin.left - margin.right;
           height = svgHeight - margin.top - margin.bottom;

         svg = d3.select("#chart-colegios")
            .append('svg')
            .attr('width', svgWidth)
            .attr('height', svgHeight)
            .append("g")
        
            .attr("transform", `translate(${margin.left}, ${margin.top})`);

        const x0 = d3.scaleBand()
            .domain(data.map(d => d.category))
            .range([0, width])
            .padding(0.1);

        const x1 = d3.scaleBand()
            .domain(["value1", "value2"])
            .range([0, x0.bandwidth()])
            .padding(0.05);

        const y = d3.scaleLinear()
            .domain([0, d3.max(data, d => d3.max([d.value1, d.value2]))])
            .nice()
            .range([height, 0]);

        // Colores para las barras
        const color = d3.scaleOrdinal()
            .domain(["value1", "value2"])
            .range(["#57db9e", "#88a7d0"]);

        // Crear las barras
        svg.selectAll(".bar-colegio")
            .data(data)
            .enter().append("g")
            .attr("transform", d => `translate(${x0(d.category)}, 0)`)
            .selectAll("rect")
            .data(d => ["value1", "value2"].map(key => ({ key, value: d[key] })))
            .enter().append("rect")
            .attr("x", d => x1(d.key))
            .attr("y", d => y(d.value))
            .attr("width", x1.bandwidth())
            .attr("height", d => height - y(d.value))
            .attr("fill", d => color(d.key));

            // ejes
            svg.append("g")
            .attr("class", "x-axis")
            .attr("transform", `translate(0, ${height})`)
            .call(d3.axisBottom(x0))
            .selectAll("text") // Ajusta el tamaño del texto del eje x
            .attr("font-size", 14); // Ajusta el tamaño del texto del eje x
        
        svg.append("g")
            .attr("class", "y-axis")
            .call(d3.axisLeft(y))
            .selectAll("text") // Ajusta el tamaño del texto del eje y
            .attr("font-size", 14); // Ajusta el tamaño del texto del eje y



        // Leyenda
         legend = svg.append("g")  // Crea un grupo SVG para la leyenda
            .attr("font-family", 'Comfortaa, sans-serif') // Define la fuente de la leyenda
            .attr("font-size", 13) // Define el tamaño de fuente de la leyenda
            .attr("text-anchor", "end") // Alinea el texto de la leyenda al final (derecha)
            .selectAll("g") // Selecciona todos los grupos dentro de "legend"
            .data(["Oficial", "No oficial"]) // Los datos para la leyenda
            .enter().append("g") // Agrega grupos para cada elemento de la leyenda
            .attr("transform", (d, i) => "translate(" + (width -50) + "," + (i * 25) + ")"); // Posiciona cada grupo de la leyenda

        legend.append("rect") // Agrega un rectángulo para los elementos de la leyenda
            .attr("x", 30) // Posición X del rectángulo
            .attr("width", 19) // Ancho del rectángulo
            .attr("height", 19) // Altura del rectángulo
            .attr("fill", d => color(d)); // Color del rectángulo basado en los datos

        legend.append("text") // Agrega texto para los elementos de la leyenda
            .attr("x", 24) // Posición X del texto
            .attr("y", 9.5) // Posición Y del texto
            .attr("dy", "0.32em") // Ajuste vertical del texto
            .text(d => d); // Texto basado en los datos

        svg.selectAll('.tick text')
                    .style('font-family', 'Comfortaa, sans-serif');

        svg.selectAll('text')
                    .style('font-family', 'Comfortaa, sans-serif');


