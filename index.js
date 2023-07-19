import cobalt from "cobalt";
import server from "cobalt/server.js";
import path from "path";
import URL from "url";
const dirname = path.dirname(URL.fileURLToPath(import.meta.url));
(async () => {
  server.config = {
    root: [
      {
        host: /.*/,
        path: dirname + "/www",
      },
    ],
    ports: {
      http: 8000,
    },
  };
  await cobalt.init();
})();
