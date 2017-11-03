var cb = new Codebird;

cb.setConsumerKey("I3CNZdD5D9JB0vVCUH52SrXWt", "K6ATzjMt6mDjpc7nWvmg0iMfbSFgK3tKz85YMFnFr4ixjvieKi");
cb.setToken("926514036270882816-nycv2pNl1HrlkRpAGGpCo01R0XBfuUs", "2xoVC7Bvr1DKHQAkMDzdEzJw3Xzmo9XlYegnvK1dg1TWJ");

function getTweets(hash) {
  return new Promise((resolve, reject)=>{
    var params = {
      q: hash,
      include_entities: true,
      count: 100
    };
    cb.__call(
      "search_tweets",
      params,
      function (reply) {
        resolve(reply);
      }
    );
  })
}

function getReainingRequests() {
  return new Promise((resolve, reject)=>{
    cb.__call(
      "search_tweets",
      "q=Twitter",
    ).then((resp)=>{
      resolve(resp.rate.remaining);
    }).catch((err)=>{
      reject(err);
    });
  });
}
