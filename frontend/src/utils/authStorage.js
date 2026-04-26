export function readStoredAuth(storage) {
  const token = storage.getItem("token")
  const savedUser = storage.getItem("user")

  if (!token || !savedUser) {
    return {
      token: null,
      user: null
    }
  }

  try {
    return {
      token,
      user: JSON.parse(savedUser)
    }
  } catch {
    storage.removeItem("token")
    storage.removeItem("user")

    return {
      token: null,
      user: null
    }
  }
}

export function persistAuth(storage, token, user) {
  storage.setItem("token", token)
  storage.setItem("user", JSON.stringify(user))
}

export function persistUser(storage, user) {
  storage.setItem("user", JSON.stringify(user))
}

export function clearStoredAuth(storage) {
  storage.removeItem("token")
  storage.removeItem("user")
}
