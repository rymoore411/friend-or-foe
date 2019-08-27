function findSpider (spiderBro, webDetect) {

  const larger = webDetect.length < spiderBro.length ? webDetect : spiderBro;
  const smaller = webDetect.length >= spiderBro.length ? webDetect : spiderBro;

  const hashSpider = {};

  smaller.forEach(elem => hashSpider[elem] = true);

  return larger.filter(el => hashSpider.hasOwnProperty((el.description.toLowerCase())));

}


module.exports = findSpider;
