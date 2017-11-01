var cb = new Codebird;

cb.setConsumerKey("qjpcbF9ou1A6RV2e1e35ZXMkx", "YlyDSCeyRRpG29MoYVHb4CPI0eU3AkEPjjDNLMhM5dOiNkrsRO");
cb.setToken("83858181-MfGjHdyeKMfBrvmbhi6SyMa2Sk2gBJar49ZvgeQEv", "Wj7Z611pMRtWzn0wyE3GGFyVCgKClpcHGDhJx1vQ3kkdH");

function getTweets(hash) {
  var params = {
    q: hash
  };
  cb.__call(
    "search_tweets",
    params,
    function (reply) {
      // ...
    }
  );
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
  getReainingRequests().then((resp)=>{
    console.log(resp);
  });
