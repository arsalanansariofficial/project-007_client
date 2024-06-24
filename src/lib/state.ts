export const state_authenticated_user = {
  details: Object(),
  message: String(),
  name: String(),
  status: Number(200),
  jwt: String(),
  user: {
    id: Number(0),
    blocked: Boolean(false),
    confirmed: Boolean(true),
    email: String(),
    provider: String(),
    username: String(),
    createdAt: String(),
    updatedAt: String()
  }
};

export const state_admin = {
  token: String(),
  user: {
    id: Number(0),
    email: String(),
    lastname: String(),
    firstname: String(),
    createdAt: String(),
    updatedAt: String(),
    username: Object(null),
    blocked: Boolean(false),
    isActive: Boolean(true),
    preferedLanguage: Object(null)
  }
};
