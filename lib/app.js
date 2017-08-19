const domready = require('domready')

domready(() => {
    //document.getElementById('app').innerHTML = 'domready'
    require('./threejs').main()
});
