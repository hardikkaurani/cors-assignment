import test from "node:test"
import assert from "node:assert/strict"

import { clearStoredAuth, persistAuth, persistUser, readStoredAuth } from "../src/utils/authStorage.js"

function createStorage(initialState = {}) {
  const state = new Map(Object.entries(initialState))

  return {
    getItem(key) {
      return state.has(key) ? state.get(key) : null
    },
    setItem(key, value) {
      state.set(key, value)
    },
    removeItem(key) {
      state.delete(key)
    }
  }
}

test("readStoredAuth returns saved token and user when both exist", () => {
  const storage = createStorage({
    token: "abc123",
    user: JSON.stringify({ email: "dev@example.com" })
  })

  assert.deepEqual(readStoredAuth(storage), {
    token: "abc123",
    user: { email: "dev@example.com" }
  })
})

test("readStoredAuth clears invalid saved user data", () => {
  const storage = createStorage({
    token: "abc123",
    user: "{not-json}"
  })

  assert.deepEqual(readStoredAuth(storage), {
    token: null,
    user: null
  })
  assert.equal(storage.getItem("token"), null)
  assert.equal(storage.getItem("user"), null)
})

test("persistAuth saves both token and user", () => {
  const storage = createStorage()

  persistAuth(storage, "abc123", { name: "Hardik" })

  assert.equal(storage.getItem("token"), "abc123")
  assert.equal(storage.getItem("user"), JSON.stringify({ name: "Hardik" }))
})

test("clearStoredAuth removes saved auth values", () => {
  const storage = createStorage({
    token: "abc123",
    user: JSON.stringify({ name: "Hardik" })
  })

  clearStoredAuth(storage)

  assert.equal(storage.getItem("token"), null)
  assert.equal(storage.getItem("user"), null)
})

test("persistUser updates only the saved user record", () => {
  const storage = createStorage({
    token: "abc123"
  })

  persistUser(storage, { name: "Updated User" })

  assert.equal(storage.getItem("token"), "abc123")
  assert.equal(storage.getItem("user"), JSON.stringify({ name: "Updated User" }))
})
