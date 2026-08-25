import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);

const __dirname = dirname(__filename);

function __getTimestamp() {
  return new Date().toISOString();
}

export { __dirname, __filename, __getTimestamp };
