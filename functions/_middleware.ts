async function errorHandler(context) {
    try {
      // wait for the next function to finish
      return await context.next();
    } catch (err) {
      // catch and report and errors when running the next function
      return new Response(`${err.message}\n${err.stack}`, { status: 500 });
    }
  }
  
  // Attach `errorHandler` to all HTTP requests
  export const onRequest = errorHandler;
  