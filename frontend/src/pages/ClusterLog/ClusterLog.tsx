import React, { useState, useEffect, useRef } from 'react'
import * as d3 from 'd3';
import Axios from 'axios'

type Point = {
    x: string,
    y: string
};

const ClusterLog = () => {
  const [cluster, setCluster] = useState<Point[][] | null>([[]]);
  const svgRef = useRef<SVGSVGElement| null>(null);

  useEffect(() => {
    Axios.get(`${process.env.REACT_APP_CLUSTER_API}/get-cluster-log`).then((response: any) => {
        console.log(response.data)
    })
  })

  return (
    <div>
      
    </div>
  )
}

export default ClusterLog
