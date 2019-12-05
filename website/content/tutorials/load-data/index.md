---
title: Load External Data
description:
draft: true
---



{{< highlight javascript>}}
getJSON('https://example.com/path/to/data.json').then(function(response){
  console.log("Here is the response", response);
}, function(error) {
  console.log("Something went wrong", error);
});
{{< /highlight >}}

References: [JavaScript Promises: an Introduction](https://developers.google.com/web/fundamentals/primers/promises)
