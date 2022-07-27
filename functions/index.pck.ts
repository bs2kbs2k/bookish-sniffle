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

    let splits: Array<string> = await (await fetch("index.pck.json")).json();
    let { readable, writable } = new TransformStream();
    for (const split of splits) {
        let response = await fetch(split);
        if (!response.ok) {
            return new Response("Could not fetch chunk", {status: 500});
        }
        await response.body.pipeTo(writable, {preventClose: true});
    }
    await writable.close();
  
    return new Response(readable);
  }
  