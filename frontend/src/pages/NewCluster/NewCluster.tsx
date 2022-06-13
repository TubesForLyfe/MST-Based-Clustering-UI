import React, { useState, useRef } from 'react'
import * as d3 from 'd3';
import Axios from 'axios'
import './NewCluster.css'

type Point = {
    x: string,
    y: string
};

const NewCluster = () => {
  const [CSVName, setCSVName] = useState<string | null>('');
  const [MST, setMST] = useState<Point[] | []>([]);
  const [amount, setAmount] = useState('');
  const svgRef = useRef<SVGSVGElement| null>(null);

  const minDomainX = (arr: any) => {
    let min = arr[0][0].x;
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[i].length; j++) {
            if (arr[i][j].x < min) {
                min = arr[i][j].x;
            }
        }
    }
    return Math.floor(min/10) * 10;
  }

  const maxDomainX = (arr: any) => {
    let max = arr[0][0].x;
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[i].length; j++) {
            if (arr[i][j].x > max) {
                max = arr[i][j].x;
            }
        }
    }
    return (Math.floor(max/10) + 1) * 10;
  }

  const minDomainY = (arr: any) => {
    let min = arr[0][0].y;
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[i].length; j++) {
            if (arr[i][j].y < min) {
                min = arr[i][j].y;
            }
        }
    }
    return Math.floor(min/10) * 10;
  }

  const maxDomainY = (arr: any) => {
    let max = arr[0][0].y;
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[i].length; j++) {
            if (arr[i][j].y > max) {
                max = arr[i][j].y;
            }
        }
    }
    return (Math.floor(max/10) + 1) * 10;
  }

  const randomInteger = (max: any) => {
    return Math.floor(Math.random()*(max + 1));
  }

  const randomRgbColor = () => {
    let r = randomInteger(255);
    let g = randomInteger(255);
    let b = randomInteger(255);
    return [r,g,b];
  }

  const randomHexColor = () => {
    let [r,g,b] =randomRgbColor();
    let hr = r.toString(16).padStart(2, '0');
    let hg = g.toString(16).padStart(2, '0');
    let hb = b.toString(16).padStart(2, '0');
    return "#" + hr + hg + hb;
  }

  const readFile = (e: any) => {
    const file = e.target.files[0];
    setCSVName(file.name);
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = () => {
        getMST(reader.result);
    }
  }

  const getMST = (reader: any) => {
    const data = reader.split('\n');
    let data_result = [];
    for (let i = 1; i < data.length; i++) {
        let point = data[i].split(',');
        data_result.push({x: point[1], y: point[2].split('\r')[0]})
    }
    Axios.post(`${process.env.REACT_APP_CLUSTER_API}/create-MST`, {
        data: data_result
    }).then((response: any) => {
        setMST(response.data);
        const svg = d3.select(svgRef.current);
        svg.selectAll('*').remove();
    })
  }

  const createCluster = (e: any) => {
    e.preventDefault();
    Axios.post(`${process.env.REACT_APP_CLUSTER_API}/create-cluster`, {
        MST: MST,
        amount: amount,
        filename: CSVName
    }).then((response: any) => {
        const w = 400;
        const h = 400;
        const svg = d3.select(svgRef.current).attr('width', w).attr('height', h).style('overflow', 'visible').style('margin-top', '50px');
        const xScale = d3.scaleLinear().domain([minDomainX(response.data), maxDomainX(response.data)]).range([0, w]);
        const yScale = d3.scaleLinear().domain([minDomainY(response.data), maxDomainY(response.data)]).range([h, 0]);
        const xAxis = d3.axisBottom(xScale).ticks(5);
        const yAxis = d3.axisLeft(yScale).ticks(5);
        svg.append('g').call(xAxis).attr('transform', `translate(0, ${h})`);
        svg.append('g').call(yAxis);
        svg.append('text').attr('x', w/2).attr('y', h + 50).text('x');
        svg.append('text').attr('y', h/2).attr('x', -50).text('y');
        for (let i = 0; i < response.data.length; i++) {
            svg.selectAll().data(response.data[i]).enter().append('circle').attr('cx', (d: any) => xScale(d.x)).attr('cy', (d: any) => yScale(d.y)).attr('r', 5).style("fill", randomHexColor());
        }
    })
  }

  return (
    <div className='container'>
      <div className='ui'>
        <h2 className='mt-3'>Create New Cluster</h2>
        <div className='cluster'>
            <h5 className='mt-2'>Insert CSV File</h5>
            <input type="file" accept='.csv' className='mt-2' onChange={ e => {
                readFile(e)
            }}/>
            {MST.length != 0 && <div>
                <p className='mt-5'>Enter the desired number of clusters</p>
                <p>(Max: {MST.length + 1})</p>
                <input type="text" onChange={ e => {
                    setAmount(e.target.value);
                }}/>
                <button type="submit" className='ms-2' onClick={ e => {
                    createCluster(e);
                }}>Create</button>
                <br></br>
                <svg ref={svgRef} className="mb-5"></svg>
            </div>}
        </div>
      </div>
    </div>
  )
}

export default NewCluster
