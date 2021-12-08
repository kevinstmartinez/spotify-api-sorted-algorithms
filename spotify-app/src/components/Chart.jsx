import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { Line } from 'react-chartjs-2'
import styles from './styles/Chart.css'
import Swal from 'sweetalert2'
import ExportExcel from 'react-export-excel'

const ExcelFile = ExportExcel.ExcelFile
const ExcelSheet = ExportExcel.ExcelSheet
const ExcelColumn = ExportExcel.ExcelColumn


export default function Chart() {
  const [timingBubbleSort, setTimingBubbleSort] = useState([])
  const [timingSelectionSort, setTimingSelectionSort] = useState([])
  const [timingInsertSort, setTimingInserSort] = useState([])
  const [songs, setSongs] = useState([])

  let dataBubble = []
  let dataSelection = []
  let dataInsertion = []


  const [data, setData] = useState({
    dataNumber: '',
    steps: ''
  })
  let labelsBubble = []
  let labelsSelection = []
  let labelsInsert = []

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleBubleSort = async (e) => {
    e.preventDefault()
    let form = document.getElementById('form')
    console.log('aa', e.target.value)

    await axios
      .post('http://localhost:9000/api/order-bubble', data, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => {
        console.log("response", response.data)
        setTimingBubbleSort(response.data.TimingBubbleSort)
        setSongs(response.data.Tracks.map(i => i.name))
      })
      .catch(error => {
        console.log(error)
        Swal.fire({
          icon: 'error',
          title: 'Error...',
          text: ' The number entered exceeds the number of data or Exced bounds, enter number in the allowed range.'
        })
      })

  }

  const handleSelectionSort = async (e) => {
    e.preventDefault()
    let form = document.getElementById('form')
    console.log('aa', e.target.value)
    await axios
      .post('http://localhost:9000/api/order-selection', data, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => {
        console.log("response", response.data)
        setTimingSelectionSort(response.data.TimingSelectionSort)
      })
      .catch(error => {
        console.log(error)
        Swal.fire({
          icon: 'error',
          title: 'Error...',
          text: ' The number entered exceeds the number of data or Exced bounds, enter number in the allowed range.'
        })
      })
  }

  const handleInsertSort = async (e) => {
    e.preventDefault()
    let form = document.getElementById('form')
    console.log('aa', e.target.value)

    await axios
      .post('http://localhost:9000/api/order-insert', data, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => {
        console.log("response", response.data)
        setTimingInserSort(response.data.TimingInsertSort)
      })
      .catch(error => {
        console.error(error)
        Swal.fire({
          icon: 'error',
          title: 'Error...',
          text: ' The number entered exceeds the number of data or Exced bounds, enter number in the allowed range.'
        })
      })
  }

  timingBubbleSort.map( i => {

      dataBubble.push({
        timing: i
      })
  
  })
  timingSelectionSort.map( i => {

      dataSelection.push({
        timing: i
      })
  
  })
  timingInsertSort.map( i => {

      dataInsertion.push({
        timing: i
      })
  
  })
  console.log('daticos', dataBubble)



  for (let i = 1; i <= timingBubbleSort.length; ++i) {
    labelsBubble.push(i)
  }

  for (let i = 1; i <= timingSelectionSort.length; ++i) {
    labelsSelection.push(i)
  }

  for (let i = 1; i <= timingInsertSort.length; ++i) {
    labelsInsert.push(i)
  }

  return (
    <>
      <div className='form'>
        <form id='form'>
          <input type="number" name="dataNumber" id="dataNumber" onChange={handleChange} placeholder='Data' required />
          <input type="number" name="steps" id="steps" onChange={handleChange} placeholder='Steps' required />
          <button onClick={handleBubleSort} value='bubbleSort'>Order By Bubble Sort</button>
          <button onClick={handleSelectionSort} value='selectionSort'>Order By Selection Sort</button>
          <button onClick={handleInsertSort} value='insertSort'>Order By Insert Sort</button>
        </form>
        <ExcelFile element={<button>Download Report</button>} filename='timing sort algoithms'>
          <ExcelSheet data={dataBubble} name='Bubble Sort'>
            <ExcelColumn label='Timing' value='timing' />
          </ExcelSheet>
          <ExcelSheet data={dataSelection} name='Selection Sort'>
            <ExcelColumn label='Timing' value='timing' />
          </ExcelSheet>
          <ExcelSheet data={dataInsertion} name='Insertion Sort'>
            <ExcelColumn label='Timing' value='timing' />
          </ExcelSheet>
        </ExcelFile>
      </div>

      <div className='Chart'>

        <div className='ChartLine'>

          <Line
            data={{
              labels: labelsBubble,
              datasets: [
                {
                  label: 'Timing Bubble Sort',
                  data: timingBubbleSort,
                  borderColor: 'rgba(75,192,192,1)',
                  backgroundColor: 'rgba(75,192,192,1)',
                  borderCapStyle: 'butt',
                  tension: .4,
                  pointBorderWidth: 0,
                  pointHoverRadius: 5,
                  pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                  pointHoverBorderColor: 'rgba(220,220,220,1)',
                  pointHoverBorderWidth: 2,
                  pointRadius: 4,
                  pointHitRadius: 10,
                },
                {
                  label: 'Timing Selection Sort',
                  data: timingSelectionSort,
                  borderColor: 'rgba(255,117,92,1)',
                  backgroundColor: 'rgba(255,117,92,1)',
                  tension: .5,
                  pointBackgroundColor: 'rgba(255,117,92,1)',
                  pointHitRadius: 5,
                  pointBorderWidth: 1,
                  pointHoverBackgroundColor: 'rgba(255,117,92,1)',
                  pointHoverBorderColor: 'rgba(255,255,255,1)',
                  pointHoverBorderWidth: 2,
                },

                {
                  label: 'Timing Insert Sort',
                  data: timingInsertSort,
                  borderColor: 'yellow',
                  backgroundColor: 'yellow',
                  tension: .5,
                  pointBackgroundColor: 'yellow',
                  pointHitRadius: 5,
                  pointBorderWidth: 1,
                  pointHoverBackgroundColor: 'yellow',
                  pointHoverBorderColor: 'rgba(255,255,255,1)',
                  pointHoverBorderWidth: 2,
                },

              ]

            }}
            height={400}
            width={600}
            options={{
              responsive: true,
              interaction: {
                mode: 'index',
                intersect: false
              },
              plugins: {
                legend: {
                  position: 'bottom'
                }
              },
              scales: {
                y: {
                  grid: {
                    display: false
                  },
                  ticks: {
                    beginAtZero: true,
                    color: "white",
                    font: {
                      size: 15
                    }
                  }

                },
                x: {
                  grid: {
                    display: false
                  },
                  ticks: {
                    beginAtZero: true,
                    color: "white",
                    font: {
                      size: 15
                    }
                  }
                }
              }

            }}
          />
        </div>
      </div>
    </>
  )
}