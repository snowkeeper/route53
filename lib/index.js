var route = require('dynroute'), 
	utils      = require('./utils'),
	configFile = process.env.HOME + '/.awsrc';

var opts = {
	"domain":["snowmaster.snowcoins.link","snowman.snowcoins.link"],
	debug: true,
	once: true,
	time: 60,
	"ttl": 60,
	'ipserver': 'http://ip-address.herokuapp.com/ip.json',
	
}

utils.parseConfigFile(configFile, opts.debug, function(awsCredentials) {
  if (opts.debug) {
    utils.debugBlock('Read AWS Credentials', awsCredentials);
  }

  route(awsCredentials, opts);

  if (!opts.once) {
    setInterval(function() {
      route(awsCredentials, opts);
    }, opts.time * 1000);
  }
});
