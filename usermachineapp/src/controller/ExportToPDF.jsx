import React from 'react';
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

 
export const ExportToPDF = ({apiData, fileName}) => {

    const generatePdf = (apiData, fileName) => {
        //var doc = new jsPDF('p', 'pt');
        console.log(fileName)
     
    try {
        
       /* function createHeaders(keys) {
            var result = [];
            for (var i = 0; i < keys.length; i += 1) {
                result.push({
                    'id' : keys[i],
                    'name': keys[i],
                    'prompt': keys[i],
                    'width': 65,
                    'align': 'center',
                    'padding': 0
                });
            }
            return result;
        }*/

        const headers = [
            'Rut', 'Nombre', 'ID_Usuario', 'Nivel', 'Status', 'Maquina', 'Area', 'Planta', 'Cod_LCH'
        ]

        var doc = new jsPDF(/*{ putOnlyUsedFonts: true, orientation: 'landscape' }*/);

        const items = apiData.map(item=>{
            return item
        })
        console.log(items)

        //convierte array de obj JSON a array de array
        const arr = apiData.map((item=>{
            return Object.keys(item).reduce((array, key)=> {
                return array.concat([item[key]]);
            }, []);
        }))
        console.log(arr)


        autoTable(doc, { 
            head: [headers], 
            body: arr,
            theme: 'grid',
            //columnStyles: { halign: 'justify'},
            styles: {
                fontSize: 8,
            },
            headStyles: { 
                halign: 'center' 
            }            
        })
        //doc.table(1, 1, apiData, headers, styles); 
        doc.save('Usuarios ' + fileName + '.pdf');

        
    } catch (error) {
        console.log(error)
    }
     

    } 

 

    return (
      <button id="btnDownload" onClick={(e) => generatePdf(apiData, fileName)} className="btn btn-success btn-sm"
      ><img src="/images/pdf.png" width='20px'></img> Descargar  PDF
      </button>
    );
  }; 
