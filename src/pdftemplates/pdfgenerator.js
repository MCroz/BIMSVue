const electron = require('electron');
const Moment = require('moment');
const fs = require('fs');
const pdf = require('html-pdf');
const http = require('http');
const path = require('path');


export default {
    generateBusinessClearance(data,serverImages) {
        

        var myvar = '<html>'+
        '  <head>'+
        '    <meta charset="utf8">'+
        '    <title>Business Clearance</title>'+
        '    <style>'+
        '      .page {'+
        '        margin: 0;'+
        '        height: 13in;'+
        '        width: 8.5in;'+
        '        border: thin solid black;'+
        '      }'+
        '      @media all {'+
        '        .first-header-page {'+
        '          background-color: yellow;'+
        '          height: .2in;'+
        '          width: 100%;'+
        '          margin: 0;'+
        '          /*border-bottom: thin solid black;*/'+
        '        }'+
        '        .main-header-page{'+
        '          width: 100%;'+
        '          background-color: white;'+
        '          height: 1.7in;'+
        '        }'+
        '        .logo-container {'+
        '          margin-left: .5in;'+
        '          width: 1.5in;'+
        '          height: 1.5in;'+
        '          border: thin solid black;'+
        '        }'+
        '        .buting-logo {'+
        '          height: 100%;'+
        '          width: 100%;'+
        '        }'+
        '        /*.center-header {'+
        '          width: 5;'+
        '          height: 100%;'+
        '          border: thin solid red;'+
        '        }*/'+
        '        .body{'+
        '          width: 100%;'+
        '          height: 10.5in;'+
        '          background-color: white;'+
        '          display: inline-block;'+
        '        }'+
        '        .second-header-page {'+
        '          background-color: yellow;'+
        '          height: .3in;'+
        '          width: 100%;'+
        '          margin: 0;'+
        '          border-bottom: thin solid black;'+
        '        }'+
        '        .body1{'+
        '          width: 100%;'+
        '          height: 2in;'+
        '          /*background-color: lightblue;*/'+
        '        }'+
        '        .body2{'+
        '          width: 100%;'+
        '          height: .67in;'+
        '          /*background-color: violet;*/'+
        '          font-size: 25;'+
        ''+
        '        }'+
        '        .body3{'+
        '          width: 100%;'+
        '          height: .67in;'+
        '          /*background-color: pink;*/'+
        '          display: flex;'+
        '          align-items: flex start;'+
        ''+
        '        }'+
        '        .newbox{'+
        ''+
        '          margin-left: .3in;'+
        '          border: thin solid black;'+
        '          width: .3in;'+
        '          height: .3in;'+
        ''+
        '        }'+
        '        .body4{'+
        '          width: 100%;'+
        '          height: .67in;'+
        '          /*background-color: orange;*/'+
        '          display: flex;'+
        '          align-items: flex start;'+
        '        }'+
        '        .bodyheader{'+
        '          width: 100%;'+
        '          height: 1in;'+
        '          /*background-color: lightgreen;*/'+
        '          font-size: 25;'+
        ''+
        '        }'+
        ''+
        '        .footer{'+
        '          width: 100%;'+
        '          height: .41in;'+
        '          border-top: thin solid black;'+
        '          background-color: yellow;'+
        '        }'+
        '        .bodynext{'+
        '          width: 100%;'+
        '          height: 4in;'+
        '          /*background-color: #bf00ff;*/'+
        '          /*border: thin solid black;*/'+
        '        }'+
        '        .bodynext2{'+
        '          width: 100%;'+
        '          height: 2in;'+
        '          /*background-color: #0080ff;*/'+
        '          /*border: thin solid black;*/'+
        '          }'+
        '          .bodynext2a{'+
        '          margin-left: .73in;'+
        '          margin-right: .2in;'+
        '          margin-top: .35in;'+
        '          margin-bottom: .2in;'+
        '          width: 7in;'+
        '          height: 1.15in;'+
        '          /*background-color: #0080ff;*/'+
        '          border: thin solid black;'+
        '        }'+
        '        .bodynext3{'+
        '          width: 100%;'+
        '          height: 1.14in;'+
        '          font-family: Arial;'+
        '          /*background-color: #0080ff;*/'+
        '          /*border: thin solid black;*/'+
        '        }'+
        '        .background-color{'+
        '          background-color: yellow;'+
        '          font-family: Arial;'+
        '        }'+
        '        .background-color2{'+
        '          vertical-align: baseline;'+
        '          background-color: white;'+
        '          font-family: Arial;'+
        '        }'+
        '        .paddingright{'+
        '          padding-right: .35in;'+
        '        }'+
        '        .paddingleft{'+
        '          padding-left: .43in;'+
        '        }'+
        '        .fontstyle{'+
        '          font-family: arial;'+
        '        }'+
        '        table, td, th{'+
        '          font-family: Arial;'+
        '          /*border: thin solid red;*/'+
        ''+
        '        }'+
        '        table{'+
        '          border-collapse: collapse;'+
        '          /*border: thin solid red;*/'+
        '          height: 100%;'+
        '          width: 100%;'+
        '        }'+
        ''+
        '        .idcontainer{'+
        '          margin-left:.5in;'+
        '          border: thin solid black;'+
        '          width: 1.55in;'+
        '          height: 1.55in;'+
        '        }'+
        '      }'+
        '      @media print {'+
        '        body {'+
        '          background: white;'+
        '        }'+
        '        .page {'+
        '          margin: 0;'+
        '          height: 100%;'+
        '          width: 100%;'+
        '        }'+
        '      }'+
        '    </style>'+
        '  </head>'+
        '  <body>'+
        '    <div class=\'page\' style="background-color:white;">'+
        '      <div class=\'first-header-page\'></div>'+
        '      <div class=\'main-header-page\'>'+
        '        <table>'+
        '          <tr>'+
        '            <th style="width: 1in; height: 100%">'+
        '              <div class="logo-container">'+
        '                <img src="{{brgyLogo}}" style="width: 100%;'+
        '                    height: 100%;'+
        '                    object-fit: cover;'+
        '                    overflow: hidden;">'+
        '              </div>'+
        '            </th>'+
        '            <th style="height: 100%; width: 3in">'+
        '              <font face="Arial"><b><font size="4.5">REPUCLIC OF THE PHILIPPINES</font></b><br>'+
        '              CITY GOVERNMENT OF PASIG<br>'+
        '              <font face="Arial" size="5"><b>BARANGAY BUTING</b></font><br><font size="2">NO.2 CONCHING ST PASIG CITY</font><br>TEL NO. 641-1140/642-726'+
        '            </th>'+
        '            <th style="height: 100%; width: 1in">'+
        '              <div class="logo-container">'+
        '                <img src="{{pasigLogo}}" style="width: 100%;'+
        '                    height: 100%;'+
        '                    object-fit: cover;'+
        '                    overflow: hidden;">'+
        '              </div>'+
        ''+
        '            </th>'+
        '        </table>'+
        '      </div>'+
        '      <div class="body">'+
        '        <div class="second-header-page"></div>'+
        '        <div class="bodyheader" align="center"><font face="Arial" ><br><u>BARANGAY BUSINESS CLEARANCE</u></font></div>'+
        '        <div class="body1">'+
        '          <table>'+
        '            <tr>'+
        '              <th style="height: 100%; width: 1in; ;">'+
        '                <div class="idcontainer">'+
        '                  <img src="{{OwnerImage}}" style="width: 100%;'+
        '                  height: 100%;'+
        '                  object-fit: cover;'+
        '                  overflow: hidden;">'+
        '                </div>'+
        '              </th>'+
        '              <th style="height: 100%; width: 5in; ">'+
        '                <div class="body2" align="left"><br>DATE</div>'+
        '                <div class="body3">'+
        '                  <br>'+
        ''+
        '                  <div class="newbox"></div>'+
        '                  <p> <font face="Arial">New</p>'+
        '                </div>'+
        '                <div class="body4">'+
        ''+
        '                  <div class="newbox"></div>'+
        '                  <p> Renew</p>'+
        '                </div>'+
        ''+
        '              </th>'+
        ''+
        '            </tr>'+
        '          </table>'+
        '        </div>'+
        '        <div class="bodynext">'+
        '          <div class="paddingleft" style="font-size: 20; font-family:arial">'+
        '            _______________'+
        '            <div class="">'+
        '              <br>'+
        '              Pursuant to the provision of the Local Government Code Sec 152, CLEARANCE is issued to <br><br>'+
        '              Business Name: {{BusinessName}}<br>'+
        '              Business Address: {{BusinessAddress}}<br>'+
        '              Floor Area: {{FloorArea}}<br>'+
        '              DTI/SEC Reg.No.: {{DTI_SEC_RegNo}}<br>'+
        '              Business Contact No.: {{BusinessContactNo}}<br><br>'+
        '              Owner\'s Name: {{OwnerFullName}}<br>'+
        '              Owner\'s Address: {{OwnerAddress}}<br>'+
        '              Owner\'s Contact No.: {{OwnerContactNo}}<br><br>'+
        '              This shall take effect upon approval and will terminate on <br>'+
        '              Unless sooner revoked for a cause or in the interest of the public.<br>'+
        ''+
        ''+
        '            </div>'+
        '          </div>'+
        '        </div>'+
        '        <div class="bodynext2">'+
        '          <div class="bodynext2a">'+
        '            <table>'+
        '              <tr>'+
        '              <th style="width: 35%;">KIND OF BUSINESS</th>'+
        '              <th style="width: 35%;">CAPITALIZATION</th>'+
        '              <th style="width: 35%;">REMARKS</th>'+
        '            </tr>'+
        '            <tr>'+
        '              <td align="center">{{KindOfBusiness}}</td>'+
        '              <td align="center">{{Capitalization}}</td>'+
        '              <td align="center"></td>'+
        '            </tr>'+
        '            </table>'+
        '            <div class="" style="font-family: arial;" align="center">'+
        '              <br>'+
        '              SUBJECT TO THE CONDITIONS SET AT THE BACK HEREOF:'+
        '            </div>'+
        ''+
        '          </div>'+
        ''+
        '        </div>'+
        '        <div class="bodynext3">'+
        '          <div class="" align="right" style="padding-right: .3in;">'+
        ''+
        '            <b>Hon. EVELYN TUANO</b> <br>'+
        '            <i><font size="2">PUNONG BARANGAY</font></i>'+
        ''+
        '          </div>'+
        '          <div class="">'+
        ''+
        '            CONTROL NO.: {{ControlNo}} <br>'+
        '            *NOT VALID WITHOUT DRYSEAL AND WITH ERASURE'+
        '          </div>'+
        ''+
        '      </div>'+
        '      </div>'+
        ''+
        '      <div class="footer">'+
        '        <div align="center"><font size="4"><i>"LAGING ANGAT ANG TAPAT SA SAMA-SAMANG PAGLILINGKO TUNGO SA KAUNLARANG HINAHANGAD"</font></i></div>'+
        '      </div>'+
        '    </div>'+
        '  </body>'+
        '</html>';
            
        

        function toFixed(num, fixed) {
            var re = new RegExp('^-?\\d+(?:\.\\d{0,' + (fixed || -1) + '})?');
            return num.toString().match(re)[0];
        };
        function formatMoney(amount, decimalCount = 2, decimal = ".", thousands = ",") {
            try {
                decimalCount = Math.abs(decimalCount);
                decimalCount = isNaN(decimalCount) ? 2 : decimalCount;
        
                const negativeSign = amount < 0 ? "-" : "";
        
                let i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString();
                let j = (i.length > 3) ? i.length % 3 : 0;
        
                return negativeSign + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) + (decimalCount ? decimal + Math.abs(amount - i).toFixed(decimalCount).slice(2) : "");
            } catch (e) {
                console.log(e)
            }
        };
        
        // var options = { format: 'Letter' };
        var options = { height: '13in', width: '8.5in' };
        //var html = fs.readFileSync('./BusinessPermit/businessclearance.html', 'utf8');
        var html = myvar;
        //var html = fs.readFileSync('./BusinessPermit/businessclearance.html', 'utf8');
        
        html = html.replace('{{brgyLogo}}', serverImages + 'buting-logo.jpg');
        html = html.replace('{{pasigLogo}}', serverImages + 'pasig-logo.jpg');
        html = html.replace('{{OwnerImage}}', serverImages + "/OwnerImages/" + data.OwnerImage);
        html = html.replace('{{BusinessName}}', data.BusinessName);
        html = html.replace('{{BusinessAddress}}', data.BusinessAddress);
        html = html.replace('{{FloorArea}}', data.FloorArea);
        
        html = html.replace('{{Capitalization}}', "₱ " + formatMoney(toFixed(data.Capitalization,2)));
        html = html.replace('{{DTI_SEC_RegNo}}', data.DTI_SEC_RegNo);
        html = html.replace('{{KindOfBusiness}}', data.KindOfBusiness);
        html = html.replace('{{OwnerFullName}}', data.OwnerFullName);
        html = html.replace('{{OwnerAddress}}', data.OwnerAddress);
        html = html.replace('{{OwnerContactNo}}', data.OwnerContactNo);
        html = html.replace('{{BusinessContactNo}}', data.BusinessContactNo);
        html = html.replace('{{ControlNo}}', data.ControlNo);
        
        //Check if PDF Server is Initialized
        if (typeof (window.pdfServer) != "undefined") {
            window.bims.pdfServer.close();
        }
        window.pdfServer = http.createServer(function (req, res) {
            if (req.url === '/favicon.ico') return res.end('404')
            //html = tmpl;
            //console.log(html);
            pdf.create(html, { height: '13in', width: '8.5in' }).toStream((err, stream) => {
            if (err) return res.end(err.stack)
            res.setHeader('Content-type', 'application/pdf')
            stream.pipe(res)
            })
        });
        
        window.pdfServer.listen(10889, function (err) {
            if (err) throw err
            console.log('Listening on http://localhost:%s', window.pdfServer.address().port)
        })
        console.log(html);
        window.open('http://localhost:' + window.pdfServer.address().port, 'PDF View');
        // pdf.create(html, { height: '13in', width: '8.5in' }).toFile('./test.pdf', function(err, res) {
        //     if (err) return console.log(err);
        //     console.log(res); // { filename: '/app/businesscard.pdf' }
        // });
    },
}