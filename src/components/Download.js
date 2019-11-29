import React, {Component} from 'react';
import {all_data} from './HeatMap';
import { AwesomeButton } from "react-awesome-button";
import "react-awesome-button/dist/styles.css";

export default class Download extends Component {
    download_csv() {
      var csv = '', row = 0, keysCounter = 0;
      var keysAmount = Object.keys(all_data[row]).length;
      for(; row < all_data.length; row++){
          // If this is the first row, generate the headings
          if(row === 0){
             // Loop each property of the object
             for(var key in all_data[row]){
                 // This is to not add a comma at the last cell
                 csv += key + (keysCounter+1 < keysAmount ? ',' : '\n' )
                 keysCounter++
             }
          }else{
             for(var key in all_data[row]){
                 csv += all_data[row][key] + (keysCounter+1 < keysAmount ? ',' : '\n' )
                 keysCounter++
             }
          }
          keysCounter = 0
      }

      var hiddenElement = document.createElement('a');
      hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
      hiddenElement.target = '_blank';
      hiddenElement.download = 'data.csv';
      hiddenElement.click();
    }

    render() {
        return <AwesomeButton type="primary" onPress={this.download_csv}>Download CSV</AwesomeButton>
    }
}
