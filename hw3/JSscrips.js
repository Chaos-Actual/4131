  !function(d,s,id){
    var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';
    if(!d.getElementById(id)){
      js=d.createElement(s);js.id=id;js.src=p+"://platform.twitter.com/widgets.js";
      fjs.parentNode.insertBefore(js,fjs);
    }
  }

  function initMap() {
    var map;
    var marker;
    var location = {lat: 44.9727, lng: -93.23540000000003};
    map = new google.maps.Map(document.getElementById('map'), {
      center: location,
      zoom: 14
    });
    marker = new google.maps.Marker({
      position: location,
      map: map
    });
  }
