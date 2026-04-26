import test from "node:test"
import assert from "node:assert/strict"

import { buildHealthResponse } from "../utils/healthResponse.js"

test("buildHealthResponse returns the default backend health message", () => {
  assert.deepEqual(buildHealthResponse(), {
    msg: "Backend connected successfully"
  })
})

test("buildHealthResponse allows overriding the message", () => {
  assert.deepEqual(buildHealthResponse("Custom status"), {
    msg: "Custom status"
  })
})
