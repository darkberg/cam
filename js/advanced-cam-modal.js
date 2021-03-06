function typeofOperation(newval, objectseq) {
  if (newval == "... Select Operation ...") {
      noMode();
      updateCamUserData(objectseq);
  } else if (newval == "Laser: Vector (no path offset)") {
      laserMode();
      updateCamUserData(objectseq);
  } else if (newval == "Laser: Vector (path inside)") {
      laserInsideMode();
      updateCamUserData(objectseq);
  } else if (newval == "Laser: Vector (path outside)") {
      laserOutsideMode();
      updateCamUserData(objectseq);
  } else if (newval == "CNC: Vector (path outside)") {
      cncOutsideMode();
      updateCamUserData(objectseq);
  } else if (newval == "CNC: Vector (path inside)") {
      cncInsideMode();
      updateCamUserData(objectseq);
  } else if (newval == "CNC: Pocket") {
      cncPocketMode();
      updateCamUserData(objectseq);
  } else if (newval == "CNC: V-Engrave") {
      cncVEngMode();
      updateCamUserData(objectseq);
  } else if (newval == "Plasma: Vector (path outside)") {
      plasmaMode();
      updateCamUserData(objectseq);
  } else if (newval == "Plasma: Vector (path inside)") {
      plasmaMode();
      updateCamUserData(objectseq);
  } else if (newval == "Plasma: Mark") {
      plasmaMode();
      updateCamUserData(objectseq);
  } else if (newval == "Plasma: Vector (no path offset)") {
      plasmaMode();
      updateCamUserData(objectseq);
  } else if (newval == "Drag Knife: Cutout") {
      dragKnifeMode();
      updateCamUserData(objectseq);
  }


}

function initAdvancedCAM() {
  $('#statusBody2').on('keyup change','input', function() {
      var inputVal = $(this).val();
      var newval = parseFloat(inputVal, 3)
      var id = $(this).attr('id');
      var objectseq = $(this).attr('objectseq');
      // console.log('Value for ' +id+ ' changed to ' +newval+ ' for object ' +objectseq );
      if ( id.indexOf('tzstep') == 0 ) {
          var numPass = Math.floor((parseFloat($('#tzdepth'+objectseq).val()) / parseFloat(newval)))

          if ((parseFloat($('#tzdepth'+objectseq).val()) / parseFloat(newval)) - Math.floor(parseFloat($('#tzdepth'+objectseq).val()) / parseFloat(newval)) != 0) {
              var finalPass = parseFloat($('#tzdepth'+objectseq).val()) - (newval * numPass);
              $('#svgZDepth').text( numPass + ' x ' + newval + 'mm + 1 x ' + finalPass + 'mm');
          } else {
              $('#svgZDepth').text( numPass + ' x ' + newval + 'mm');
          }
          updateCamUserData(objectseq);
      } else if ( id.indexOf('tzdepth') == 0 ) {
          $('#svgZFinal').text(newval + 'mm');
          var numPass = Math.floor((parseFloat(newval) / parseFloat($('#tzstep'+objectseq).val())))
          if ((parseFloat(newval) / parseFloat($('#tzstep'+objectseq).val())) - Math.floor(parseFloat(newval) / parseFloat($('#tzstep'+objectseq).val())) != 0) {
              var finalPass = parseFloat(newval) - ($('#tzstep'+objectseq).val() * numPass);
              $('#svgZDepth').text( numPass + ' x ' + $('#tzstep'+objectseq).val() + 'mm + 1 x ' + finalPass + 'mm');
          } else {
              $('#svgZDepth').text( numPass + ' x ' + $('#tzstep'+objectseq).val() + 'mm');
          }
          updateCamUserData(objectseq);
      } else if ( id.indexOf('tspeed') == 0 ) {
          updateCamUserData(objectseq);
      } else if ( id.indexOf('tplungespeed') == 0 ) {
          updateCamUserData(objectseq);
      } else if ( id.indexOf('ttooldia') == 0 ) {
          $('#svgToolDia').text(newval + 'mm');
          updateCamUserData(objectseq);
      } else if ( id.indexOf('tclearanceHeight') == 0 ) {
          $('#svgZClear-8').text(newval + 'mm');
          updateCamUserData(objectseq);
      } else if ( id.indexOf('tdragoffset') == 0 ) {
          $('#dragKnifeRadius').text(newval + 'mm');
          updateCamUserData(objectseq);
      } else if ( id.indexOf('tspotsize') == 0 ) {
          $('#svgToolDia-4').text(newval + 'mm');
          updateCamUserData(objectseq);
      } else if ( id.indexOf('tplasmakerf') == 0 ) {
          $('#svgPlasmaKerf').text(newval + 'mm');
          updateCamUserData(objectseq);
      } else if ( id.indexOf('tplasmazheight') == 0 ) {
          $('#svgPlasmaZHeight').text(newval + 'mm');
          updateCamUserData(objectseq);
      } else if ( id.indexOf('tplasmaihs') == 0 ) {
          $('#svgPlasmaIHS').text(newval);
          updateCamUserData(objectseq);
      } else if ( id.indexOf('tabdepth') == 0 ) {
          $('#svgtabdepth').text(newval);
          console.log("tabdepth")
          updateCamUserData(objectseq);
      } else if ( id.indexOf('tOpName') == 0 ) {
          $('#svgOpName').text(newval);
          updateCamUserData(objectseq);
      }


  });

  $('#statusBody2').on('keyup change','select', function() {
      var newval = $(this).val();
      var id = $(this).attr('id');
      var objectseq = $(this).attr('objectseq');
      // console.log('Value for ' +id+ ' changed to ' +newval+ ' for object ' +objectseq );
      if ( id.indexOf('toperation') == 0 ) {
          typeofOperation(newval, objectseq)
      };

  });
};

function updateCamUserData(i) {
    toolpathsInScene[i].userData.camOperation = $('#toperation'+i).val();
    toolpathsInScene[i].userData.camToolDia = $('#ttooldia'+i).val();
    toolpathsInScene[i].userData.camZClearance = $('#tclearanceHeight'+i).val();
    toolpathsInScene[i].userData.camDragOffset = $('#tdragoffset'+i).val();
    toolpathsInScene[i].userData.camLaserPower = $('#tpwr'+i).val();
    toolpathsInScene[i].userData.camZStep = $('#tzstep'+i).val();
    toolpathsInScene[i].userData.camZDepth = $('#tzdepth'+i).val();
    toolpathsInScene[i].userData.camFeedrate = $('#tspeed'+i).val();
    toolpathsInScene[i].userData.camPlungerate = $('#tplungespeed'+i).val();
    toolpathsInScene[i].userData.camPlasmaKerf = $('#tplasmakerf'+i).val();
    toolpathsInScene[i].userData.camPlasmaZHeight = $('#tplasmazheight'+i).val();
    toolpathsInScene[i].userData.camPlasmaIHS = $('#tplasmaihs'+i).val();
    toolpathsInScene[i].userData.camSpotSize = $('#tspotsize'+i).val();
    toolpathsInScene[i].userData.camTabDepth = $('#tabdepth'+i).val();
    toolpathsInScene[i].name = $('#tOpName'+i).val();


};


function setupJob(i) {

    $('#statusmodal').modal('show');
    $('#statusTitle').empty();
    $('#statusTitle').html('Configure Toolpath');
    $('#statusBody').empty();
    $('#statusBody2').empty();

    // $('#statusBody').html('' );
    var template2 = `
    Configure the operation for the toolpath
    <table>
      <tr>
        <th style="width: 150px;"></th><th style="width: 210px;"></th>
      </tr>
      <tr>
        <td>Name:</td>
        <td>
          <div class="input-addon">
            <span class="input-addon-label-left"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></span>
            <input type="text" class="cam-form-field" value="` + toolpathsInScene[i].name + `" id="tOpName`+i+`"  objectseq="`+i+`" min="0" style="border-right: 1px solid #ddd; width: 180px; text-align: center;">
          </div>
        </td>
      </tr>
    </table>

    <table>
      <tr>
        <th style="width: 150px;"></th><th style="width: 210px;"></th>
      </tr>
      <tr>
        <td>Type of cut: </td>
        <td>
          <div class="input-addon">
            <span class="input-addon-label-left"><i class="fa fa-wrench" aria-hidden="true"></i></span>
            <select class="cam-form-field" id="toperation`+i+`" objectseq="`+i+`" style="border-right: 1px solid #ddd; width: 180px;">
              <option>... Select Operation ...</option>
              <option>CNC: Vector (path inside)</option>
              <option>CNC: Vector (path outside)</option>
              <option>CNC: Pocket</option>
              <option>Laser: Vector (no path offset)</option>
              <option>Laser: Vector (path inside)</option>
              <option>Laser: Vector (path outside)</option>
              <!--option>CNC: V-Engrave</option-->
              <option>Plasma: Vector (path outside)</option>
              <option>Plasma: Vector (path inside)</option>
              <option>Plasma: Vector (no path offset)</option>
              <option>Plasma: Mark</option>
              <option>Drag Knife: Cutout</option>
            </select>
          </div>
        </td>

      </tr>
      <tr class="inputcnc">
        <td>Endmill Diameter</td>
        <td>
          <div class="input-addon">
            <span class="input-addon-label-left"><img src="images/endmilldia.svg" width="16px" height="16px"></img></span>
            <input type="number" class="cam-form-field" value="6.35" id="ttooldia`+i+`"  objectseq="`+i+`" min="0">
            <span class="input-addon-label-right">mm</span>
          </div>
        </td>
      </tr>
      <tr class="inputcnc inputplasma inputdragknife">
        <td>Z Safe Height</td>
        <td>
          <div class="input-addon">
            <span class="input-addon-label-left"><i class="fa fa-arrows-v" aria-hidden="true"></i></span>
            <input type="number" class="cam-form-field" value="10" id="tclearanceHeight`+i+`"  objectseq="`+i+`" min="1">
            <span class="input-addon-label-right">mm</span>
          </div>
        </td>
      </tr>
      <tr class="inputdragknife">
        <td>Drag Knife: Center Offset</td>
        <td>
          <div class="input-addon">
            <span class="input-addon-label-left"><img src="images/dragoffset.svg" width="16px" height="16px"></img></span>
            <input type="number" class="cam-form-field" value="0.1" id="tdragoffset`+i+`"  objectseq="`+i+`" step="0.1" min="0">
            <span class="input-addon-label-right">mm</span>
          </div>
        </td>
      </tr>
      <tr class="inputlaser">
        <td>Laser: Power</td>
        <td>
          <div class="input-addon">
            <span class="input-addon-label-left"><i class="fa fa-tachometer" aria-hidden="true"></i></span>
            <input type="number" class="cam-form-field" value="100" id="tpwr`+i+`" objectseq="`+i+`" min="1" max="100">
            <span class="input-addon-label-right">%</span>
          </div>
        </td>
      </tr>
      <tr class="inputlaser">
        <td>Laser: Kerf</td>
        <td>
          <div class="input-addon">
            <span class="input-addon-label-left"><img src="images/kerf.svg" width="16px" height="16px"></img></span>
            <input type="number" class="cam-form-field" value="0.1" id="tspotsize`+i+`" objectseq="`+i+`" min="0.1" max="5" step="0.1">
            <span class="input-addon-label-right">mm</span>
          </div>
        </td>
      </tr>
      <tr class="inputcnc">
        <td>Cut Depth: per Pass</td>
        <td>
          <div class="input-addon">
            <span class="input-addon-label-left"><i class="fa fa-sort-amount-asc" aria-hidden="true"></i></span>
            <input type="number" class="cam-form-field" id="tzstep`+i+`" value="1" objectseq="`+i+`" min="0" step="1">
            <span class="input-addon-label-right">mm</span>
          </div>
        </td>
      </tr>
      <tr class="inputcnc">
        <td>Cut Depth: Final</td>
        <td>
          <div class="input-addon">
            <span class="input-addon-label-left"><i class="fa fa-level-down" aria-hidden="true"></i></span>
            <input type="number" class="cam-form-field" id="tzdepth`+i+`" value="6" objectseq="`+i+`" min="0" step="1">
            <span class="input-addon-label-right">mm</span>
          </div>
        </td>
      </tr>
      <tr class="inputcnc inputdragknife inputlaser inputplasma">
        <td>Feedrate: Cut</td>
        <td>
          <div class="input-addon">
            <span class="input-addon-label-left"><i class="fa fa-exchange" aria-hidden="true"></i></span>
            <input type="number" class="cam-form-field" value="1000" id="tspeed`+i+`" objectseq="`+i+`" min="0" step="1" >
            <span class="input-addon-label-right">mm/min</span>
          </div>
        </td>
      </tr>
      <tr class="inputcnc">
        <td>Feedrate: Plunge</td>
        <td>
          <div class="input-addon">
            <span class="input-addon-label-left"><i class="fa fa-exchange fa-rotate-90" aria-hidden="true"></i></span>
            <input type="number" class="cam-form-field" value="300" id="tplungespeed`+i+`" objectseq="`+i+`" min="0" step="1">
            <span class="input-addon-label-right">mm/min</span>
          </div>
        </td>
      </tr>
      <tr class="inputcnc">
        <td>Tabs: Depth</td>
        <td>
          <div class="input-addon">
            <span class="input-addon-label-left"><i class="fa fa-exchange fa-rotate-90" aria-hidden="true"></i></span>
            <input type="number" class="cam-form-field" value="0" id="tabdepth`+i+`" objectseq="`+i+`" step="1">
            <span class="input-addon-label-right">mm</span>
          </div>
        </td>
      </tr>
      <tr class="inputplasma">
        <td>Plasma: Kerf</td>
        <td>
          <div class="input-addon">
            <span class="input-addon-label-left"><img src="images/kerf.svg" width="16px" height="16px"></img></span>
            <input type="number" class="cam-form-field" value="1.2" id="tplasmakerf`+i+`" objectseq="`+i+`" min="0" step="1">
            <span class="input-addon-label-right">mm</span>
          </div>
        </td>
      </tr>
      <tr class="inputplasma">
        <td>Plasma: Cut Height</td>
        <td>
          <div class="input-addon">
            <span class="input-addon-label-left"><i class="fa fa-arrows-v" aria-hidden="true"></i></span>
            <input type="number" class="cam-form-field" value="1.5" id="tplasmazheight`+i+`" objectseq="`+i+`" min="0" step="1">
            <span class="input-addon-label-right">mm</span>
          </div>
        </td>
      </tr>
      <tr class="inputplasma">
        <td>Plasma: Use IHS</td>
        <td>
          <div class="input-addon">
            <span class="input-addon-label-left"><i class="fa fa-wrench" aria-hidden="true"></i></span>
            <select class="cam-form-field" id="tplasmaihs`+i+`" objectseq="`+i+`" style="border-right: 1px solid #ddd; width: 180px;">
              <option>Yes</option>
              <option>No</option>
            </select>

          </div>
        </td>
      </tr>
    </table>`
    $('#statusBody2').html(template2);
    $('#statusFooter').html(`<button type="button" class="btn btn-lg btn-success" data-dismiss="modal" onclick="toolpathPreview(`+i+`); fillTree();">Preview Toolpath </button>`);
    noMode(); // Default to NOOP

    if (toolpathsInScene[i].userData.camOperation) {
      $('#toperation'+i).val(toolpathsInScene[i].userData.camOperation).prop('selected', true)
      $('#ttooldia'+i).val(toolpathsInScene[i].userData.camToolDia);
      $('#tclearanceHeight'+i).val(toolpathsInScene[i].userData.camZClearance);
      $('#tdragoffset'+i).val(toolpathsInScene[i].userData.camDragOffset);
      $('#tspotsize'+i).val(toolpathsInScene[i].userData.camSpotSize);
      $('#tpwr'+i).val(toolpathsInScene[i].userData.camLaserPower);
      $('#tzstep'+i).val(toolpathsInScene[i].userData.camZStep);
      $('#tzdepth'+i).val(toolpathsInScene[i].userData.camZDepth);
      $('#tspeed'+i).val(toolpathsInScene[i].userData.camFeedrate);
      $('#tplungespeed'+i).val(toolpathsInScene[i].userData.camPlungerate);
      $('#tplasmakerf'+i).val(toolpathsInScene[i].userData.camPlasmaKerf);
      $('#tplasmazheight'+i).val(toolpathsInScene[i].userData.camPlasmaZHeight);
      $('#tabdepth'+i).val(toolpathsInScene[i].userData.camTabDepth);
      $('#tplasmaihs'+i).val(toolpathsInScene[i].userData.camPlasmaIHS).prop('selected', true);
      $('#tOpName'+i).val(toolpathsInScene[i].name);

      typeofOperation(toolpathsInScene[i].userData.camOperation, i);
    };


}

function noMode() {
  $('.inputcnc').hide();
  $('.inputlaser').hide();
  $('.inputdragknife').hide();
  $('.inputplasma').hide();
}

function laserMode() {
    $('.inputcnc').hide();
    $('.inputdragknife').hide();
    $('.inputplasma').hide();
    $('.inputlaser').show();
};

function laserInsideMode() {
    $('.inputcnc').hide();
    $('.inputdragknife').hide();
    $('.inputplasma').hide();
    $('.inputlaser').show();
};

function laserOutsideMode() {
    $('.inputcnc').hide();
    $('.inputdragknife').hide();
    $('.inputplasma').hide();
    $('.inputlaser').show();
};

function cncInsideMode() {
    $('.inputlaser').hide();
    $('.inputdragknife').hide();
    $('.inputplasma').hide();
    $('.inputcnc').show();
};

function cncOutsideMode() {
    $('.inputlaser').hide();
    $('.inputdragknife').hide();
    $('.inputplasma').hide();
    $('.inputcnc').show();
};

function cncPocketMode() {
    $('.inputlaser').hide();
    $('.inputdragknife').hide();
    $('.inputplasma').hide();
    $('.inputcnc').show();
};

function plasmaMode() {
    $('.inputcnc').hide();
    $('.inputlaser').hide();
    $('.inputdragknife').hide();
    $('.inputplasma').show();
};


function dragKnifeMode() {
    $('.inputcnc').hide();
    $('.inputlaser').hide();
    $('.inputplasma').hide();
    $('.inputdragknife').show();
};
