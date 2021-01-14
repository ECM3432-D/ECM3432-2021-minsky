import * as React from "react"
import Layout from "../components/layout"
import RgbCanv from "../components/rgbcanv"
import Composite from "../components/composite"
import TemperaturePlot from "../components/temperatureplot"
import { useState } from "react"

const IndexPage = () => {
  let lineData: number[], rawData: number[]
  const buffer_size = 20
  rawData = new Array()
  lineData = new Array(buffer_size)

  const [plotData, setPlotData] = useState(lineData)
  const [plotMin, setPlotMin] = useState(0)
  const [plotMax, setPlotMax] = useState(100)

  function fn(v: number, min: number, max: number) {
    let len = rawData.push(v)
    if (len > buffer_size) {
      rawData.shift()
    }
    // Use spread operator to copy the array. Otherwise React won't know the value
    // has changed.
    for (let i in rawData) {
      lineData[i] = ~~((rawData[i] - min) * (100 / (max - min)))
      if (lineData[i] > 100) lineData[i] = 100
    }
    setPlotData([...lineData])
    setPlotMin(min)
    setPlotMax(max)
  }


function buttonClickedLeft(){
		console.log("button clicked");
    var img = document.getElementById('rotation');
    if(img.classList.contains("north")){
        img.setAttribute("class", "east");
    }else if(img.classList.contains("east")){
        img.setAttribute('class','south');
    }else if(img.classList.contains('south')){
        img.setAttribute('class','west');
    }else if(img.classList.contains('west')){
        img.setAttribute('class','north');
    }
else img.setAttribute('class', 'die');
	}

function buttonClickedRight(){
		console.log("button clicked");
    var img = document.getElementById('rotation');
    if(img.classList.contains("north")){
        img.setAttribute("class", "west");
    }else if(img.classList.contains("west")){
        img.setAttribute('class','south');
    }else if(img.classList.contains('south')){
        img.setAttribute('class','east');
    }else if(img.classList.contains('east')){
        img.setAttribute('class','north');
    }
else img.setAttribute('class', 'die');
	}
	
	


  return (

    <Layout>

      <div className="row" style={{ visibility: "hidden", height: "0px" }} >
      </div>
      <div className="row">
        <Composite id="comp"  width={480} height={640} callback={fn} controls="off" />
        <TemperaturePlot id="plot" width={300} height={400} pal={200} latest={plotData} min={plotMin} max={plotMax} />
     <div>
	<button id="rotateButtonLeft" className="btn btn-primary" onClick={buttonClickedLeft}>Rotate left</button>
	<button id="rotateButtonRight" className="btn btn-primary" onClick={buttonClickedRight}>Rotate right</button>
	</div>
</div>
	
    </Layout>

  )
}

export default IndexPage