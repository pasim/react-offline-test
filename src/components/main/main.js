import React, {Component} from 'react';
import Charts from 'react-apexcharts';
import fetch from 'node-fetch'

export default class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
          error: null,
          isLoaded: false,
          items: {},
        };
    }

    componentDidMount() {

      try {

        fetch('https://api.carbonintensity.org.uk/generation')
        .then(res => res.json())
        .then((result) => {
          this.setState({
            isLoaded: true,
            items: result.data,
          }),
          (error) => {
            this.setState({
              isLoaded: true,
              error,
            })
          }
        })
        
      } catch (error) {
        // Pass
      }

    }
    

    render() {
      const {error, isLoaded, items} = this.state;
      const DATE_OPTIONS = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric'};

    //   const generateKey = (pre) => {
    //     return `${ pre }_${ new Date().getTime() }`;
    // }

      if(error){
        return <div className="error">Error: {error.message}</div>
      } else if (!isLoaded){

        return <div className="loader">Loading ...</div>

      } else {
        // console.log(items);
        const titles = [];
        const series = [];
        items.generationmix.map((item,index) =>{
            titles.push(item.fuel.toUpperCase() + ' ' + item.perc);
            series.push(item.perc);
        })

        const options = {
          labels: titles,
          responsive: [{
            breakpoint: 480,
            options: {
              chart: {
                width: 200
              },
              legend: {
                position: 'bottom'
              }
            }
          }]
        };
// Be carefull when testing @see https://github.com/apexcharts/vue-apexcharts/issues/119
        return <div className="component-main">
          <h2 className="list-title">Data from {new Date(items.from).toLocaleString("en-GB", DATE_OPTIONS)} to: {new Date(items.to).toLocaleString("en-GB", DATE_OPTIONS)}</h2>
          <p className="overview">Number of results {items.generationmix.length}.</p>
          {
            
            <div id="chart">
            <Charts options={options} series={series} type="pie" width="380" />
          </div>
            
            /* <p>&nbsp;</p>
          <ul>
            {items.generationmix.map((item,index) => (
              <li key="{index+1}">{index+1} {item.fuel.toUpperCase()} - {item.perc}</li>

            ))}
          </ul> */}
        </div>;
      }
      
    }
  }