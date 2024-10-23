//src/app/api/uploadthing/route.ts
//Server Endpoint for a GET & a POST request, with a route handler for the images from UploadThing

import { createRouteHandler } from "uploadthing/next";
import { fileRouter } from "./core";

export const { GET, POST } = createRouteHandler({
  router: fileRouter,
});
