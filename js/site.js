//https://proxy.hxlstandard.org/data.json?url=https%3A//docs.google.com/spreadsheets/d/1UMiFwFMijHlsRP_OM5zKNl6FFH5BXQ91qzcD8YnU4Ao/pub%3Fgid%3D396841826%26single%3Dtrue%26output%3Dcsv&strip-headers=on&filter01=select&select-query01-01=region%3DAmericas&force=on

function insertDropdown(id,filters){
    filters.forEach(function(f){
        $(id).append('<option value="'+f[0]+'">'+f[0]+' ('+f[1]+')</option>');
    });
}

function constructCSVURL(){
    filters = [
        {'id':'#regiondropdown','tag':'region'},
        {'id':'#countrydropdown','tag':'country-code'},
        {'id':'#branchdropdown','tag':'loc%2Bbranch%2Btype%2Bcode'}
    ]
    var url = 'https://proxy.hxlstandard.org/data.csv?url=https%3A//docs.google.com/spreadsheets/d/1UMiFwFMijHlsRP_OM5zKNl6FFH5BXQ91qzcD8YnU4Ao/pub%3Fgid%3D396841826%26single%3Dtrue%26output%3Dcsv&force=on'
    //select-query01-01=region%3DAmericas
    filtercount=1;
    filters.forEach(function(f){
        if($(f['id']).val()!='none'){
            url+='&filter0'+filtercount+'=select'
            url += '&select-query0'+filtercount+'-01='+f['tag']+'%3D'+encodeURIComponent($(f['id']).val());
            filtercount++
        }
    });
    return url;
}

var regionCall = $.ajax({ 
    type: 'GET', 
    url: 'https://proxy.hxlstandard.org/data.json?strip-headers=on&filter01=count&count-tags01=region&url=https%3A//docs.google.com/spreadsheets/d/1UMiFwFMijHlsRP_OM5zKNl6FFH5BXQ91qzcD8YnU4Ao/pub%3Fgid%3D396841826%26single%3Dtrue%26output%3Dcsv&force=on', 
    dataType: 'json',
});

var countryCall = $.ajax({ 
    type: 'GET', 
    url: 'https://proxy.hxlstandard.org/data.json?strip-headers=on&filter01=count&count-tags01=country-code&url=https%3A//docs.google.com/spreadsheets/d/1UMiFwFMijHlsRP_OM5zKNl6FFH5BXQ91qzcD8YnU4Ao/pub%3Fgid%3D396841826%26single%3Dtrue%26output%3Dcsv&force=on', 
    dataType: 'json',
});

var branchCall = $.ajax({ 
    type: 'GET', 
    url: 'https://proxy.hxlstandard.org/data.json?strip-headers=on&filter01=count&count-tags01=loc%2Bbranch%2Btype%2Bcode&url=https%3A//docs.google.com/spreadsheets/d/1UMiFwFMijHlsRP_OM5zKNl6FFH5BXQ91qzcD8YnU4Ao/pub%3Fgid%3D396841826%26single%3Dtrue%26output%3Dcsv&force=on', 
    dataType: 'json',
});

$.when(regionCall,countryCall,branchCall).then(function(regionArgs,countryArgs,branchArgs){
    console.log(regionArgs);
    insertDropdown('#regiondropdown',regionArgs[0].splice(1));
    console.log(countryArgs);
    insertDropdown('#countrydropdown',countryArgs[0].splice(1));
    console.log(branchArgs);
    insertDropdown('#branchdropdown',branchArgs[0].splice(1));
    $('#downloadcsv').on('click',function(){
        var url = constructCSVURL();
        window.open(url);
    });    
});