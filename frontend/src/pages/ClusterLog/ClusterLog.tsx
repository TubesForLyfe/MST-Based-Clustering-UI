import React, { useState, useEffect, useRef } from 'react'
import * as d3 from 'd3';
import Axios from 'axios'
import { minDomainX, maxDomainX, minDomainY, maxDomainY } from "../../components/domain"
import { randomHexColor } from "../../components/randomColor"

const ClusterLog = () => {
  const [logList, setLogList] = useState<[] | null>([]);
  const svgRef = useRef<SVGSVGElement| null>(null);

  const getCluster = (data: any) => {
    const w = 250;
    const h = 250;
    const svg = d3.select(svgRef.current).attr('width', w).attr('height', h).style('overflow', 'visible').style('margin-top', '50px');
    svg.selectAll('*').remove();
    const xScale = d3.scaleLinear().domain([minDomainX(data), maxDomainX(data)]).range([0, w]);
    const yScale = d3.scaleLinear().domain([minDomainY(data), maxDomainY(data)]).range([h, 0]);
    const xAxis = d3.axisBottom(xScale).ticks(5);
    const yAxis = d3.axisLeft(yScale).ticks(5);
    svg.append('g').call(xAxis).attr('transform', `translate(0, ${h})`);
    svg.append('g').call(yAxis);
    svg.append('text').attr('x', w/2).attr('y', h + 50).text('x');
    svg.append('text').attr('y', h/2).attr('x', -50).text('y');
    for (let i = 0; i < data.length; i++) {
        svg.selectAll().data(data[i]).enter().append('circle').attr('cx', (d: any) => xScale(d.x)).attr('cy', (d: any) => yScale(d.y)).attr('r', 5).style("fill", randomHexColor());
    }
  }

  useEffect(() => {
    Axios.get(`${process.env.REACT_APP_CLUSTER_API}/get-cluster-log`).then((response: any) => {
        console.log(response.data)
        setLogList(response.data)
    })
  }, [])

  return (
    <div className='container'>
        <div className='ui'>
            <h2 className='mt-3'>Cluster Log History</h2>
            <div className='d-flex flex-row'>
                <div className='mx-4 cluster'>
                    <table className='mt-2 table'>
                        <tr>
                            <th>Tanggal & Waktu</th>
                            <th>Nama File</th>
                            <th>Jumlah Cluster</th>
                            <th>Button</th>
                        </tr>
                        {logList?.map((val: any, key) => {
                            return (
                                <tr>
                                    <td>{val.datetime}</td>
                                    <td>{val.filename}</td>
                                    <td>{val.cluster_amount}</td>
                                    <td><button onClick={ e => getCluster(val.cluster_result)}>Show</button></td>
                                </tr>
                            )
                        })}
                    </table>
                </div>
                <div className='mx-4 cluster'>
                    <h4 className='mt-3'>Cluster Result</h4>
                    <svg ref={svgRef} className="mb-5"></svg>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ClusterLog
