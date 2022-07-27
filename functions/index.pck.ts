export async function onRequestGet(context) {
    // Contents of context object
    const {
      request, // same as existing Worker API
      env, // same as existing Worker API
      params, // if filename includes [id] or [[path]]
      waitUntil, // same as ctx.waitUntil in existing Worker API
      next, // used for middleware or to fetch assets
      data, // arbitrary space for passing data between middlewares
    } = context;
    const prefix = request.url.replace("index.pck", "");

    let splits: Array<string> = await (await fetch(prefix + "index.pck.json")).json();
    let { readable, writable } = new TransformStream();
    let promised = Promise.resolve();
    for (const split of splits) {
        let response = await fetch(prefix + split);
        if (!response.ok) {
            return new Response("Could not fetch chunk", {status: 500});
        }
        promised = promised.then(() => response.body.pipeTo(writable, {preventClose: true}));
    }
    waitUntil(promised.then(() => writable.close()));
  
    return new Response(readable);
  }
  